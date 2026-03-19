import { XMLParser } from "fast-xml-parser"

import * as types from "./types.js"

function fetchNewsByRubric(rubricUrl: string): Promise<string> {
  return fetch(rubricUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Некорректный ответ сервера");
      }
      return response.text();
    })
    .catch((error) => {
      console.error(`Ошибка при получении новостей по ${rubricUrl}`);
      throw error;
    });
}

function parseNewsByRubric(rawData: string): types.NewsItem[] {
  /**
   * Парсинг XML-данных с новостями.
   *
   * @privateRemarks
   * Для парсинга используется библиотека `fast-xml-parser`.
   *
   * @todo
   * Дополните функцию для соответствия результатов 
   * формату `types.NewsItem[]`
   *
   * @param rawData - сырая строка с xml.
   *
   * @returns массив новостей.
   */

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const parsedData = parser.parse(rawData);

  const items: unknown[] = parsedData?.rss?.channel?.item ?? [];
  const itemsArray = Array.isArray(items) ? items : [items];

  return itemsArray.map((item: any) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    author: item.author ?? item["dc:creator"] ?? "",
    enclosure: item.enclosure?.["@_url"] ?? undefined,
    description: item.description ?? "",
    pubDate: item.pubDate ?? "",
  }));
}

function loadNewsByRubric(rubricUrl: string): Promise<types.NewsItem[]> {
  /**
   * Загрузка новостей по адресу рубрики.
   *
   * @todo
   * Исправьте ошибку
   *
   * @param rubricUrl - ссылка на страницу с новостями по рубрике.
   *
   * @returns массив новостей.
   */

  return fetchNewsByRubric(rubricUrl).then(parseNewsByRubric);
}

export async function load(rubricsOfInterest: types.Rubrics): Promise<types.RenderContext> {
  const news: { [key: string]: types.NewsItem[] } = {};

  for (const rubric of rubricsOfInterest) {
    news[rubric.title] = await loadNewsByRubric(rubric.link);
  }

  return news;
}
