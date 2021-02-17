<h1 align="center">ExpressJS - Backend Startup Coffee</h1>
<p align="center">
    <a href="https://github.com/rizqonmaulana/backend_startup_coffee/issues">Report Bug</a>
    ·
    <a href="https://github.com/rizqonmaulana/backend_startup_coffee/issues">Request Feature</a>
  </p>

Startup coffee is a website that was built for coffee shop or caffee owners to handle orders in their shop, as an owner you can add product, add promo, manage orders, get daily order profit, weeks order amount and anual sales data in a chart. you can manage orders easily and quickly, because everything is handled by the system automatically. coffee startup is built with javascript, express js, vue js and mysql. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name startup_coffee, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/8213807/TVsoGVkJ)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost
DB_NAME=startup_coffee
DB_USER=root
DB_PASS=
DB_TIMEZONE=UTC
PORT=3000
URL=http://localhost:8080


```

## License

© [Rizqon Maulana](https://github.com/rizqonmaulana/)
