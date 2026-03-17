import { checkbox } from "@inquirer/prompts";
import * as types from "./types.js";

export async function getUserInput(): Promise<types.Settings> {
  /**
   * Интерактивный консольный ввод настроек.
   * 
   * @remarks
   * Пользователь выбирает интересующие его
   * новостные рубрики (категории) из списка.
   * Выбор множественный.
   * 
   * @privateRemarks
   * Используются промпты из @inquirer/prompts.
   *
   * Для получения перечня рубрик перед выдачей 
   * используется storage::loadRubrics().
   * 
   * @returns промис, разрешающийся настройками
   * 
   * @throws если не удается получить настройки. 
   * 
   */

  const selectedRubrics = await checkbox<types.RubricItem["id"]>({
    message: "Выберите интересующие рубрики",
    choices: [
      { name: "Бизнес - Энергетика", value: "business-energy" },
      { name: "Политика", value: "politics" },
    ],
  });

  return {
    selectedRubrics,
  };
}
