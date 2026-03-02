import { fetchNews } from "./fetcher.js"
import { parseXML } from "./parser.js"

function getNews(rubric) {
    fetchNews('rubric/business').then(content => {
        if (!content) {
            throw new Error('Отсутствует контент')
        }

        const data = parseXML(content)

        console.log(
            ...data.toReversed().map(item => item.title + '\n')
        )
    })
}

function getRubrics(rubrics) {

}


export default function getData(settings) {

}
