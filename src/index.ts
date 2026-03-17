/**
 * @privateRemarks
 * Файл не требует изменений и дополнений
 */

import * as cli from "./cli.js";
import * as loader from "./loader.js";
import * as renderer from "./renderer.js";

export default async function run() {
  /**
   * Главная функция для запуска приложения.
   *
   * @remarks
   * Пользователь выбирает интересующие новостные рубрики,
   * после чего происходит загрузка новостей по выбранным
   * рубрикам и генерируется pdf-файл с результатами.
   *
   * @public
   *
   */

  try {
    const selectedRubrics = await cli.getUserInput();
    const news = await loader.load(selectedRubrics);
    await renderer.save(news);
  } catch (error) {
    console.error("Необходимо задать настройки");
  }
}

run();
