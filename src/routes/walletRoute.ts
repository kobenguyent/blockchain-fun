import express from "express";
import CreateWalletController from "../controller/wallet/CreateWallet";
import GetWalletBalanceController from "../controller/wallet/GetWalletBalance";

export const walletRoute = express.Router();

walletRoute.post("/wallet/create", async (req, res) => {
    const controller = new CreateWalletController();
    const response = await controller.createWallet()
    return res.send(response);
});

walletRoute.get("/wallet/balance/:walletAddress", async (req, res) => {
    const controller = new GetWalletBalanceController();
    const response = await controller.getWalletBalance(req.params['walletAddress'])
    return res.send(response);
});
