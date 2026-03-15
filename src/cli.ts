import { confirm, checkbox } from "@inquirer/prompts";
import * as types from "./types.js";


function formatSettings(settings: types.Settings) {
  return `Выбранные рубрики:\n${settings.rubrics.join("\n\t")}`;
}

export async function userWantsToEdit(currentSettings: types.Settings) {
  console.log(formatSettings(currentSettings));

  return await confirm({
    message: "Хотите изменить настройки?",
    default: false,
  });
}

export async function getUserInput() {
  const choosenRubrics = await checkbox({
    message: "Выберите интересующие рубрики",
    choices: [
      { name: "Бизнес - Энергетика", value: "business-energy" },
      { name: "Политика", value: "politics" },
    ],
  });

  const choosenDaysOfWeek: types.DayOfWeek[] = await checkbox({
    message: "В какие дни вы желаете получать новости?",
    choices: [
      { name: "Понедельник", value: 1 },
      { name: "Вторник", value: 2 },
      { name: "Среда", value: 3 },
      { name: "Четверг", value: 4 },
      { name: "Пятница", value: 5 },
      { name: "Суббота", value: 6 },
      { name: "Воскресенье", value: 0 },
    ],
  });

  const choosenTime: types.Time[] = await checkbox({
    message: "В какое время вы желаете получать новости?",
    choices: [
      { name: "07:00", value: "07:00" },
      { name: "08:00", value: "08:00" },
      { name: "09:00", value: "09:00" },
      { name: "10:00", value: "10:00" },
      { name: "17:00", value: "17:00" },
      { name: "18:00", value: "18:00" },
      { name: "19:00", value: "19:00" },
      { name: "20:00", value: "20:00" },
    ],
  });

  const settings = {
    rubrics: choosenRubrics,
    schedule: {
      daysOfWeek: choosenDaysOfWeek,
      time: choosenTime
    }
  };

  return settings;
}
