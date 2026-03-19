import { XMLParser } from "fast-xml-parser";

import * as types from "./types.js";

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

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsedData = parser.parse(rawData);

  const items: unknown[] = parsedData?.rss?.channel?.item ?? [];

  return items.map((item: unknown) => {
    const entry = item as Record<string, unknown>;
    return {
      title: String(entry["title"] ?? ""),
      link: String(entry["link"] ?? ""),
      author: String(entry["dc:creator"] ?? entry["author"] ?? ""),
      enclosure: (entry["enclosure"] as Record<string, string> | undefined)?.["@_url"], // fast-xml-parser prefix for XML attributes
      description: String(entry["description"] ?? ""),
      pubDate: String(entry["pubDate"] ?? ""),
    } satisfies types.NewsItem;
  });
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

  const url = rubricUrl.endsWith(".xml") ? rubricUrl : `${rubricUrl}.xml`;
  return fetchNewsByRubric(url).then(
    parseNewsByRubric,
  );
}

export async function load(rubricsOfInterest: types.Rubrics): Promise<types.RenderContext> {
  const news: { [key: string]: types.NewsItem[] } = {};

  for (const rubric of rubricsOfInterest) {
    news[rubric.title] = await loadNewsByRubric(rubric.link);
  }

  return news;
}
