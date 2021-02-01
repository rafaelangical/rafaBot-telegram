# Bot telegram with NeoWs Api

* bot telegram...

## Prerequisites

* [node](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/lang/en/docs/install/)
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)

## Running

```shell
git clone https://github.com/rafaelangical/rafaBot-telegram
cd rafaBot-telegram
npm install or yarn
cp .env.example .env
Open .env on editor and set value of NASA_KEY provided by https://api.nasa.gov/index.html#apply-for-an-api-key
and TELEGRAM_TOKEN provided by https://core.telegram.org/bots/api

# To execute in development mode
yarn dev or npm run dev

# To execute in production mode
Open .env on editor and set NODE_ENV="production"
yarn build or npm run build
yarn start or npm run start
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/rafaelangical/rafaBot-telegram/blob/main/LICENSE) file for details. 