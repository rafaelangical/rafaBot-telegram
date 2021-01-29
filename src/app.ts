import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import moment from "moment";
import express from "express";
import path from 'path';

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: path.join(__dirname, '../.env') })

const NASA_KEY = process.env.NASA_KEY;
const NASA_ENDPOINT = process.env.NASA_ENDPOINT;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const PORT = process.env.PORT || 3000;

const app = express();
const bot = new TelegramBot(TELEGRAM_TOKEN as string, { polling: true });

app.get("/", (req, res) => {
  res.send("Hello i'am rafaBot :)");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});

bot.on("new_chat_members", (msg: any) => {
  bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo(a) !!`);
});

bot.on("message", async (msg: any) => {
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
      return data.near_earth_objects[objFirstProperty].map((item: any) => {
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

    // TODO: return on no data

    // return console.log("data", data.near_earth_objects);
  }

  return bot.sendMessage(
    msg.chat.id,
    `Olá ${
      msg.from.first_name + " " + msg.from.last_name
    }, essa é uma mensagem automática :) \nvamos ?`
  );
});
