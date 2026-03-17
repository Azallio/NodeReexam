import ejs from 'ejs'
import puppeteer from 'puppeteer'
import type { RenderContext } from '../types.js'

function renderMarkup(context: RenderContext): Promise<string> {
  /**
   * Рендерит информацию о новостях по рубрикам в html-строку по шаблону.
   * 
   * @remarks
   * Получает на вход объект с новостями, передает его в шаблонизатор,
   * возвращает сгенерированную строку с HTML.
   *  
   * @privateRemarks
   * Для шаблонизации используется библиотека `ejs`, 
   * которая отрисовывает данные в подготовленный шаблон 
   * 
   * @param context - объект с данными о новостях. 
   * 
   */

  const mainTemplatePath = String(new URL('./template.ejs', import.meta.url))

  return new Promise((resolve, reject) => {
    ejs.renderFile(mainTemplatePath, { context }, (error: Error | null, html: string) => {
      if (error) {
        reject(error)
      }

      resolve(html)
    })
  })
}

export default async function savePdf(context: RenderContext) {
  /**
   * Сохраняет html-контент в pdf-файл.
   * 
   * @remarks
   * Получает на вход строку с html-контентом, помещает 
   * его на страницу браузера и сохраняет в pdf-формат.
   * 
   * Для сохранения использует файлы с названием вида 
   * `vedomosti_yyyy_mm_dd_hh_mm.pdf`. 
   * 
   * @privateRemarks
   * Для сохранения используется библиотеку `puppeteer`, 
   * которая отвечает за открытие браузера, создание страницы,
   * наполнение ее html-содержимым и сохранение страницы в pdf.
   * 
   * @param context - строка с HTML-содержимым для выгрузки. 
   * 
   */
  
  const pathToSaveFile = '' // TODO сгенерировать актуальное название файла

  try {
    const htmlContent = await renderMarkup(context)
    const browser = await puppeteer.launch();

    // TODO создать в браузере новую страницу
    // TODO задать странице html-содержимое
    // TODO сохранить страницу в pdf в формате A4

    await browser.close();
  } catch (error) {
    console.error(error)
  }
}
