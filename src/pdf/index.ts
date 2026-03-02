import { default as renderMarkup } from './renderMarkup.js'
import { default as savePdf } from './savePdf.js'

export default function generatePdf(news) {
    const markup = renderMarkup(news)
    savePdf(markup, "")
} 