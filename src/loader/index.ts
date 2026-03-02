import * as fetcher from "./fetcher.js"
import * as parser from "./parser.js"
import * as storage from '../storage/index.js'

function loadNews(rubric) {
    return fetcher.fetchNews('rubric/business').then(content => {
        if (!content) {
            throw new Error('Отсутствует контент')
        }

        const data = parser.parseNews(content)

        return data.toReversed().map(item => item.title + '\n')
    })
}

async function loadRubrics() {
    const { rubrics, last_modified } = parser.parseRubricsJSON()

    if (last_modified > new Date()) {
        return rubrics
    }

    const freshRubrics = await fetcher.fetchRubrics()
    storage.writeRubrics(freshRubrics)

    return freshRubrics
}


export default async function load(settings) {
    const allRubrics = await loadRubrics()

    // filter by rubrics set in settings
    const filteredRubrics = allRubrics

    const news = []

    for (const rubric of filteredRubrics) {
        news.push(loadNews(rubric))
    }

    return news
}
