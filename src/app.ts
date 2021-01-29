import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import moment from 'moment';
import express from 'express';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

const { NASA_KEY } = process.env;
const { NASA_ENDPOINT } = process.env;
const { TELEGRAM_TOKEN } = process.env;
const PORT = process.env.PORT || 3000;

const app = express();
const bot: TelegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

app.get('/', (req, res) => {
  res.send("Hello i'am rafaBot :)");
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

bot.on('new_chat_members', (msg: TelegramBot.Message) => {
  bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo(a) !!`);
});

bot.on('left_chat_member', (msg: TelegramBot.Message) => {
  bot.sendMessage(msg.chat.id, `Flwww ${msg.from.first_name} !!`);
});

bot.on('message', async (msg: TelegramBot.Message) => {
  const thermMatch = 'Algum asteroide oferece perigo ao planeta Terra na data de hoje?';

  if (msg.text.toLowerCase() === thermMatch.toLowerCase()) {
    const todayDate = moment().format('YYYY-MM-DD');

    try {
      const { data } = await axios.get<Types.NasaApiResponse>(
        `${NASA_ENDPOINT}?start_date=${todayDate}&end_date=${todayDate}&api_key=${NASA_KEY}`,
      );

      const objFirstProperty = Object.keys(data.near_earth_objects)[0];

      if (
        !data
        || !data.near_earth_objects
        || !data.near_earth_objects[objFirstProperty]
      ) {
        return bot.sendMessage(msg.chat.id, 'Não, fique tranquilo ;-)');
      }

      await bot.sendMessage(
        msg.chat.id,
        'Sim! \nSegue a Lista de asteroides próximo da terra!',
      );

      if (data.near_earth_objects) {
        return data.near_earth_objects[objFirstProperty].map((item: Types.Nears) => bot.sendMessage(
          msg.chat.id,
          `\n● Nome: ${item.name}\n
      ● Diâmetro estimado (em Km): ${item.estimated_diameter.kilometers.estimated_diameter_max}\n
      ● Distância em que ele irá passar em relação à Terra (em Km): ${item.close_approach_data[0].miss_distance.kilometers} \n
      ● Velocidade relativa à Terra (em Km/h): ${item.close_approach_data[0].relative_velocity.kilometers_per_hour}\n
      ● ${item.links.self}\n\n`,
        ));
      }
    } catch (e) {
      return bot.sendMessage(msg.chat.id, 'Não, fique tranquilo ;-)');
    }
  }

  return bot.sendMessage(
    msg.chat.id,
    `Olá ${
      `${msg.from.first_name} ${msg.from.last_name}`
    }, essa é uma mensagem automática :) \nPara saber se existe algum asteroide perto da terra digite: \nAlgum asteroide oferece perigo ao planeta Terra na data de hoje?`,
  );
});
