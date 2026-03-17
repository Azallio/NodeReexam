import { checkbox } from "@inquirer/prompts";
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

  return await checkbox<types.RubricItem>({
    message: "Выберите интересующие рубрики",
    choices: [
      {
        name: "Бизнес",
        value: {
          link: "https://www.vedomosti.ru/rss/rubric/business",
          title: "Бизнес",
        },
      },
      {
        name: "Стиль жизни",
        value: {
          link: "https://www.vedomosti.ru/rss/rubric/lifestyle",
          title: "Стиль жизни",
        },
      },
    ],
  });
}
