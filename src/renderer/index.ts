import ejs from 'ejs'
import puppeteer from 'puppeteer'
import type { RenderContext } from '../types.js'

function renderMarkup(context: RenderContext): Promise<string> {
  const mainTemplatePath = String(new URL('./templates/index.ejs', import.meta.url))

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
  const pathToSaveFile = ''

  try {
    const htmlContent = await renderMarkup(context)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent)
    await page.pdf({ path: pathToSaveFile, format: "A4" })
    await browser.close();
  } catch (error) {
    console.error(error)
  }
}
