import ejs from "ejs"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer"
import type { RenderContext } from "./types.js"

function renderMarkup(context: RenderContext): Promise<string> {
  /**
   * Рендерит информацию о новостях по рубрикам в html-строку по шаблону.
   *
   * @privateRemarks
   * Для шаблонизации используется библиотека `ejs`,
   * которая отрисовывает данные в подготовленный шаблон
   *
   * @todo
   * Завершите промисификацию функции ejs.renderFile:
   * в коллбэк-функции проверяйте, есть ли ошибки при
   * рендере (и в этом случае отклоняйте промис) либо
   * же всё хорошо (в этом случае разрешайте промис).
   * Проверьте шаблон `_template.ejs`, при необходимости
   * внесите в него правки и дополнения.
   *
   * @param context - объект с данными о новостях.
   *
   * @returns сгенерированную строку с HTML
   */

  const mainTemplatePath = fileURLToPath(new URL("./_template.ejs", import.meta.url));

  return new Promise((resolve, reject) => {
    ejs.renderFile(mainTemplatePath, { context }, (error: Error | null, html: string) => {
      if (error) {
        reject(error);
      } else {
        resolve(html);
      }
    });
  });
}

function generateFilename(): string {
  /**
   * Генерирует имя pdf-файла для сохранения
   *
   * @remarks
   * Имя файла имеет вид `vedomosti_yyyy_mm_dd_hh_mm.pdf`
   *
   * @todo
   * Определите текущие дату и время и верните результат
   * в форматированном по образцу виде.
   *
   **/

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `vedomosti_${yyyy}_${mm}_${dd}_${hh}_${min}.pdf`;
}

export async function save(context: RenderContext) {
  /**
   * Сохраняет html-контент в pdf-файл.
   *
   * @remarks
   * Получает на вход строку с html-контентом, помещает
   * его на страницу браузера и сохраняет в pdf-формат.
   *
   * @privateRemarks
   * Для сохранения используется библиотеку `puppeteer`,
   * которая отвечает за открытие браузера, создание страницы,
   * наполнение ее html-содержимым и сохранение страницы в pdf.
   *
   * @todo
   * Создайте через объект браузера новую страницу (newPage),
   * задайте ей содержимое (setContent), сохраните в pdf
   * в формате A4 (pdf) под правильным названием.
   *
   * @param context - строка с HTML-содержимым для выгрузки.
   *
   */

  const pathToSaveFile = generateFilename();

  try {
    const htmlContent = await renderMarkup(context);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.pdf({ path: pathToSaveFile, format: "A4" });
    await browser.close();
  } catch (error) {
    console.error(error);
  }
}
