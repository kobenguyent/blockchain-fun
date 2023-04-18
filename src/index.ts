import express, {Application, Request, Response, Router} from 'express';
import Blockchain from "./Blockchain";
export const kobeCoin = new Blockchain()
import Wallet = require("./Wallet");
export const wallet = new Wallet()
import Transaction = require("./Transaction");

const app: Application = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

import morgan from "morgan";
import { routes } from './routes';
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('../docs/swagger.json');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();});

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));

app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        explorer: true,
        swaggerOptions: {
            url: "swagger.json",
            name: "docs"
        },
    })
);

// routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
