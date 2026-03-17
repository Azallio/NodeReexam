import { XMLParser } from "fast-xml-parser";

import * as storage from "./storage/index.js";
import * as types from "./types.js";

function fetchNews(rubricUrl: string): Promise<string> {
  return fetch(rubricUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Некорректный ответ сервера");
      }
      return response.text();
    })
    .catch((error) => {
      console.error(`Ошибка при получении новостей по ${rubricUrl}`);
      throw error
    });
}

function parseNews(rawData: string): types.NewsItem[] {
  const parser = new XMLParser();
  const parsedData = parser.parse(rawData);
  return parsedData["rss"]["channel"]["item"];
}

function loadNewsByRubric(rubricUrl: string): Promise<types.NewsItem[]> {
  return fetchNews("https://www.vedomosti.ru/rss/rubric/business.xml")
    .then(parseNews);
}

export async function load(rubricsOfInterest: RubricItem["link"][]): Promise<types.RenderContext> {
  const { rubrics: allRubrics } = await storage.loadRubrics();

  // filter by rubrics set in settings
  const filteredRubrics = allRubrics;

  const news: { [key: string]: types.NewsItem[] } = {};

  for (const rubric of filteredRubrics) {
    news[rubric.title] = await loadNewsByRubric(rubric.link);
  }

  return news;
}
