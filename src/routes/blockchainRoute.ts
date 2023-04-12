import express from "express";
import ChainController from "../controller/Chain";

export const blockchainRoute = express.Router();

blockchainRoute.get("/getChain", async (_req, res) => {
    const controller = new ChainController();
    const response = await controller.getChain();
    return res.send(response);
});

