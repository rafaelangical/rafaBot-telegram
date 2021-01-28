const TelegramBot = require(`node-telegram-bot-api`);
const axios = require("axios");
const moment = require("moment");
require("dotenv/config");

const NASA_KEY = process.env.NASA_KEY;
const NASA_ENDPOINT = process.env.NASA_ENDPOINT;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on("polling_error", (err) => console.log(err));

bot.on("new_chat_members", (msg) => {
  bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo(a) !!`);
});

bot.on("message", async (msg) => {
  console.log("message obj of user", msg);
  const thermMatch =
    "Algum asteroide oferece perigo ao planeta Terra na data de hoje?";

  if (msg.text.toLowerCase() === thermMatch.toLowerCase()) {
    const todayDate = moment().format("YYYY-MM-DD");

    const { data } = await axios.get(
      `${NASA_ENDPOINT}?start_date=${todayDate}&end_date=${todayDate}&api_key=${NASA_KEY}`
    );

    await bot.sendMessage(
      msg.chat.id,
      `Sim! \nSegue a Lista de asteroides próximo da terra !`
    );

    const objFirstProperty = Object.keys(data.near_earth_objects)[0];

    if (data.near_earth_objects) {
      return data.near_earth_objects[objFirstProperty].map((item) => {
        console.log(item.close_approach_data);
        return bot.sendMessage(
          msg.chat.id,
          `● Nome: ${item.name}\n
      ● Diâmetro estimado (em Km): ${item.estimated_diameter.kilometers.estimated_diameter_max}\n
      ● Distância em que ele irá passar em relação à Terra (em Km): ${item.close_approach_data[0].miss_distance.kilometers} \n
      ● Velocidade relativa à Terra (em Km/h): ${item.close_approach_data[0].relative_velocity.kilometers_per_hour}\n
      ● ${item.links.self}\n
      ---------------------- 
      \n\n`
        );
      });
    }
    // return console.log("data", data.near_earth_objects);
  }

  return bot.sendMessage(
    msg.chat.id,
    `Olá ${
      msg.from.first_name + " " + msg.from.last_name
    }, essa é uma mensagem automática :) \nvamos ?`
  );
});
