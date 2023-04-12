import express from "express";
import { defaultRoute } from './defaultRoute';
import {blockchainRoute} from "./blockchainRoute";
import {transactionRoute} from "./transactionRoute";
import {walletRoute} from "./walletRoute";

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(blockchainRoute)
routes.use(transactionRoute)
routes.use(walletRoute)
