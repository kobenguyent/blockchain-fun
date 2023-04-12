import express from "express";
import PendingListController from "../controller/transaction/PendingList";
import AddTransactionController from "../controller/transaction/AddTransaction";
import MineTransactionController from "../controller/transaction/MineTransaction";

export const transactionRoute = express.Router();

transactionRoute.get("/transaction/pendingList", async (_req, res) => {
    const controller = new PendingListController();
    const response = await controller.getPendingTransactionList()
    return res.send(response);
});

transactionRoute.post("/transaction/add", async (req, res) => {
    const controller = new AddTransactionController();
    const response = await controller.addTransaction(req.body)
    return res.send(response);
});

transactionRoute.post("/transaction/mine/:walletAddress", async (req, res) => {
    const controller = new MineTransactionController();
    const response = await controller.mineTransaction(req.params['walletAddress'])
    return res.send(response);
});
