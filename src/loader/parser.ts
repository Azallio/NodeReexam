import { XMLParser } from 'fast-xml-parser'
import type { NewsItem } from '../types.js'

export function parseNews(rawData: string): NewsItem[] {
    const parser = new XMLParser()
    const parsedData = parser.parse(rawData)
    return parsedData["rss"]["channel"]["item"]
}

export function parseRubricsXML() {

}

export function parseRubricsJSON() {
    
}