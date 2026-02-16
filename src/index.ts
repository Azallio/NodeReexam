import { XMLParser } from 'fast-xml-parser'
import type { NewsItem } from './types.js'

const BASE_URL = 'https://www.vedomosti.ru/rss/'

function fetchXML(url: string) {
    return fetch(BASE_URL + url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Некорректный ответ сервера")
            }
            return response.text()
        })
        .catch(error => {
            console.error(error)
        })
}

function parseXML(rawData: string): NewsItem[] {
    const parser = new XMLParser()
    const parsedData = parser.parse(rawData)
    return parsedData["rss"]["channel"]["item"]
}

// fetchXML('news')
fetchXML('rubric/business').then(content => {
    if (!content) {
        throw new Error('Отсутствует контент')
    }

    const data = parseXML(content)

    console.log(
        ...data.toReversed().map(item => item.title + '\n')
    )
})