import { readFile } from "node:fs/promises";
import type { Rubrics } from "./types.js";

class FileNotFoundError extends Error {
    constructor(message: `Файл не найден: ${string}.json`) {
        super(message);
        this.name = "FileNotFoundError";
    }
}

export function loadRubrics(): Promise<Rubrics> {
    /**
     * Осуществляет асинхронное чтение информации о рубриках из файла.
     *
     * @todo
     * Реализуйте чтение файла с рубриками через fs/promises::readFile,
     * обработайте исключения
     *
     * @returns Промис, разрешающийся объектом с информацией о рубриках,
     * отклоняемый при возникновении ошибок загрузки, в том числе при
     * отсутствии файла
     *
     * @throws {@link FileNotFoundError}
     * Причина отклонения промиса в случае отсутствия файла
     *
     */

    const RUBRICS_PATH = new URL("./_rubrics.json", import.meta.url);

    return readFile()
}
