import { confirm, checkbox } from "@inquirer/prompts"
import { loadSettings, writeSettings } from "./settings/index.js"

function isInitialRun() {
    return false
}

function formatSettings(settings) {
    return `Выбранные рубрики:\n${settings.rubrics.join('\n\t')}`
}

export async function getUserInput() {
    if (!isInitialRun) {
        const currentSettings = loadSettings()
        console.log(formatSettings(currentSettings))
        const userWantsToEdit = await confirm({ message: "Хотите изменить настройки?", default: false })
        if (!userWantsToEdit) {
            return currentSettings
        }
    }

    const choosenRubrics = await checkbox({
        message: "Выберите интересующие рубрики",
        choices: [
            { name: "Бизнес - Энергетика", value: "business-energy" },
            { name: "Политика", value: "politics" }
        ]
    })

    const settings = {
        rubrics: choosenRubrics
    }

    writeSettings(settings)

    return settings
}