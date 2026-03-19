import { checkbox } from "@inquirer/prompts";
import * as storage from "./storage.js";
import * as types from "./types.js";

export async function getUserInput(): Promise<types.Rubrics> {
  /**
   * Интерактивный консольный ввод предпочтений.
   *
   * @remarks
   * Пользователь выбирает (множественный выбор)
   * интересующие его новостные рубрики из списка.
   *
   * @privateRemarks
   * Используются промпты из @inquirer/prompts.
   *
   * @todo
   * Предоставляйте пользователю данные для выбора
   * на основе функции `storage::loadRubrics()`.
   *
   * @returns промис, разрешающийся выбранными рубриками
   *
   */

  const rubrics = await storage.loadRubrics();

  return await checkbox<types.RubricItem>({
    message: "Выберите интересующие рубрики",
    choices: rubrics.map((rubric) => ({
      name: rubric.title,
      value: rubric,
    })),
  });
}
