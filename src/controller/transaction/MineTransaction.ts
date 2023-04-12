import {kobeCoin} from "../../index";
import {Post, Route, Tags} from "tsoa";
import Transaction from "../../Transaction";
import { Request} from 'express';
import * as Path from "path";

@Route("transaction/mine/:walletAddress")
@Tags('transaction')
export default class MineTransactionController {
    @Post()
    public async mineTransaction(walletAddress: string): Promise<Array<Transaction>> {
        kobeCoin.minePendingTransactions(walletAddress)
        kobeCoin.minePendingTransactions(walletAddress)
        return kobeCoin.pendingTransactions;
    }
}
