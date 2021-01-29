"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const NASA_KEY = process.env.NASA_KEY;
const NASA_ENDPOINT = process.env.NASA_ENDPOINT;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const PORT = process.env.PORT || 3000;
const app = express_1.default();
const bot = new node_telegram_bot_api_1.default(TELEGRAM_TOKEN, { polling: true });
app.get("/", (req, res) => {
    res.send("Hello i'am rafaBot :)");
});
app.listen(PORT, () => {
    console.log(`Example app listening on port: ${PORT}`);
});
bot.on("new_chat_members", (msg) => {
    bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo(a) !!`);
});
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("message obj of user", msg);
    const thermMatch = "Algum asteroide oferece perigo ao planeta Terra na data de hoje?";
    if (msg.text.toLowerCase() === thermMatch.toLowerCase()) {
        const todayDate = moment_1.default().format("YYYY-MM-DD");
        const { data } = yield axios_1.default.get(`${NASA_ENDPOINT}?start_date=${todayDate}&end_date=${todayDate}&api_key=${NASA_KEY}`);
        yield bot.sendMessage(msg.chat.id, `Sim! \nSegue a Lista de asteroides próximo da terra !`);
        const objFirstProperty = Object.keys(data.near_earth_objects)[0];
        if (data.near_earth_objects) {
            return data.near_earth_objects[objFirstProperty].map((item) => {
                console.log(item.close_approach_data);
                return bot.sendMessage(msg.chat.id, `● Nome: ${item.name}\n
      ● Diâmetro estimado (em Km): ${item.estimated_diameter.kilometers.estimated_diameter_max}\n
      ● Distância em que ele irá passar em relação à Terra (em Km): ${item.close_approach_data[0].miss_distance.kilometers} \n
      ● Velocidade relativa à Terra (em Km/h): ${item.close_approach_data[0].relative_velocity.kilometers_per_hour}\n
      ● ${item.links.self}\n
      ---------------------- 
      \n\n`);
            });
        }
        // TODO: return on no data
        // return console.log("data", data.near_earth_objects);
    }
    return bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name + " " + msg.from.last_name}, essa é uma mensagem automática :) \nvamos ?`);
}));
//# sourceMappingURL=app.js.map