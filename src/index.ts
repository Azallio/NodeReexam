import * as cli from "./cli.js";
import * as storage from './storage/index.js'
import * as types from './types.js'
import load from "./loader/index.js";
import savePdf from "./renderer/index.js";


export default async function run() {
  let settings: types.Settings | null = null;

  try {
    settings = await storage.loadSettings();

    if (await cli.userWantsToEdit(settings)) {
      settings = await cli.getUserInput();
      storage.writeSettings(settings);
    }
  } catch (error) {
    if (error instanceof storage.FileNotFoundError) {
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