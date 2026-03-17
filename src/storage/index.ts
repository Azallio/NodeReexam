import { readFile, writeFile } from "node:fs/promises";

import { FileNotFoundError } from "../exceptions.js";
import type { Rubrics, Settings } from "../types.js";

const RUBRICS_PATH = new URL("./rubrics.json", import.meta.url);
const SETTINGS_PATH = new URL("./settings.json", import.meta.url);

export async function writeSettings(settings: Settings) {
    /**
     * Осуществляет асинхронную запись настроек в файл.
     *
     * @privateRemarks
     * Используется промисифицированная функция fs/promises::writeFile
     * 
     * @param settings - объект с настройками
     * 
     * @returns Промис, который разрешается при успешной записи,
     * отклоняется при возникновении ошибок записи
     *
     */

    try {
        return
    } catch (error) {

    }
}

export async function loadSettings(): Promise<Settings> {
    /**
     * Осуществляет асинхронное чтение настроек из файла.
     *
     * @privateRemarks
     * Используется промисифицированная функция fs/promises::readFile
     *  
     * @returns Промис, который разрешается объектом с настройками,
     * отклоняется при возникновении ошибок, в том числе при
     * отсутствии файла
     * 
     * @throws {@link FileNotFoundError}
     * Причина отклонения промиса в случае отсутствия файла
     * 
     */

    try {
        return
    } catch (error) {

    }
}

export function loadRubrics(): Promise<Rubrics> {
    /**
     * Осуществляет асинхронное чтение информации о рубриках из файла.
     *
     * @privateRemarks
     * Используется функция fs::readFile в коллбэк-стиле     
     *  
     * @returns Промис, разрешающийся объектом с информацией о рубриках,
     * отклоняемый при возникновении ошибок загрузки, в том числе при
     * отсутствии файла
     * 
     * @throws {@link FileNotFoundError}
     * Причина отклонения промиса в случае отсутствия файла
     * 
     */

    return new Promise((resolve, reject) => {

    })
}
