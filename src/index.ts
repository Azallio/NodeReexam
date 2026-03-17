/**
 * Файл не требует изменений и дополнений 
 */

import * as cli from "./cli.js";
import * as storage from './storage/index.js'
import * as types from './types.js'
import * as exceptions from './exceptions.js'
import * as loader from "./loader.js";
import savePdf from "./renderer/index.js";


export default async function run() {
  /**
   * Главная функция для запуска приложения.
   * 
   * @remarks
   * При первичном запуске пользователь выбирает интересующие 
   * его рубрики, эти настройки сохраняются.
   *  
   * Далее происходит загрузка новостей по выбранным рубрикам, 
   * после чего генерируется pdf-файл с результатами. 
   * 
   * @throws если не удается получить настройки. 
   * 
   * @public
   * 
   */

  let settings: types.Settings | null = null;

  try {
    settings = await storage.loadSettings();
  } catch (error) {
    if (error instanceof exceptions.FileNotFoundError) {
      settings = await cli.getUserInput();
      storage.writeSettings(settings);
    } else {
      throw new Error("Необходимо задать настройки")
    }
  }

  const news = await loader.load(settings.selectedRubrics);
  await savePdf(news);
}

run()