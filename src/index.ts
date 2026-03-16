import * as cli from "./cli.js";
import * as storage from './storage/index.js'
import * as types from './types.js'
import * as exceptions from './exceptions.js'
import load from "./loader/index.js";
import savePdf from "./renderer/index.js";


export default async function run() {
  /**
   * Главная функция для запуска приложения.
   * 
   * @remarks
   * При первичном запуске пользователь выбирает интересующие его 
   * рубрики и расписание получения новостей, настройки сохраняются.
   * 
   * При дальнейших запусках у пользователя есть возможность изменить
   * настройки либо согласиться с уже заданными.
   * 
   * Далее процесс ожидает наступления установленного времени,
   * совершает загрузку новостей по выбранным рубрикам, после чего
   * сохраняет их в pdf-файл, и продолжает работу в фоновом режиме. 
   * 
   * @throws если не удается получить настройки. 
   * 
   * @public
   * 
   */

  let settings: types.Settings | null = null;

  try {
    settings = await storage.loadSettings();
    if (await cli.userWantsToEdit(settings)) {
      throw new exceptions.SettingsOutdatedError()
    }
  } catch (error) {
    if (error instanceof exceptions.FileNotFoundError || error instanceof exceptions.SettingsOutdatedError) {
      settings = await cli.getUserInput();
      storage.writeSettings(settings);
    } else {
      throw new Error("Необходимо задать настройки")
    }
  }

  setInterval(async () => {
    const news = await load(settings.rubrics);
    await savePdf(news);
  }, 5_000);
}

run()