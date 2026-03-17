import { readFile } from "node:fs";
import { FileNotFoundError } from "../exceptions.js";
import type { Rubrics } from "../types.js";

const RUBRICS_PATH = new URL("./rubrics.json", import.meta.url);

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
