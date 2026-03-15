import { XMLParser } from "fast-xml-parser";
import htmlParser from 'node-html-parser'
import * as types from "../types.js";

export function parseNews(rawData: string): types.NewsItem[] {
  const parser = new XMLParser();
  const parsedData = parser.parse(rawData);
  return parsedData["rss"]["channel"]["item"];
}

export function parseRubrics(rawData: string): types.RubricItem[] {
  const root = htmlParser.parse(rawData)
  const rubrics: types.RubricItem[] = []


  return rubrics
}