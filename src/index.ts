import { getUserInput } from "./cli.js"
import load from "./loader/index.js"
import generatePdf from "./pdf/index.js"

export default async function run() {
    const settings = await getUserInput()

    setInterval(async () => {       
        const news = await load(settings)
        generatePdf(news)
    }, 5_000)
}