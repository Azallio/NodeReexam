import { readFile, writeFile } from "node:fs";
import { FileNotFoundError } from "../exceptions.js";
import type { Rubrics, RubricsStorage } from "../types.js";

const RUBRICS_PATH = new URL("./rubrics.json", import.meta.url);

export function writeRubrics(rubrics: Rubrics["rubrics"]): Promise<void> {
    /**
     * Осуществляет асинхронную запись информации о рубриках в файл.
     * 
     * @privateRemarks
     * Используется функция fs::writeFile в коллбэк-стиле
     * 
     * @param rubrics - объект с информациях о рубриках
     * 
     * @returns Промис, который разрешается при успешной записи,
     * отклоняется при возникновении ошибок записи
     * 
     */

    return new Promise((resolve, reject) => {

    })
}

export function loadRubrics(): Promise<RubricsStorage> {
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
