import { Router } from 'express';
import { Get, Route } from "tsoa";

export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
    res.send("Welcome to KobeCoin");
});
