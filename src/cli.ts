import { confirm, checkbox } from "@inquirer/prompts"
import * as storage from "./storage/index.js"

function isInitialRun() {
    return false
}

function formatSettings(settings) {
    return `Выбранные рубрики:\n${settings.rubrics.join('\n\t')}`
}

export async function getUserInput() {
    if (!isInitialRun) {
        const currentSettings = storage.loadSettings()
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

    storage.writeSettings(settings)

    return settings
}