import express from "express";
import CreateWalletController from "../controller/wallet/CreateWallet";

export const walletRoute = express.Router();

walletRoute.post("/wallet/create", async (_req, res) => {
    const controller = new CreateWalletController();
    const response = await controller.createWallet()
    return res.send(response);
});

