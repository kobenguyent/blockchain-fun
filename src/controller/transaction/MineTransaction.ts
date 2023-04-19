import {kobeCoin} from "../../index";
import {Post, Route, Tags} from "tsoa";
import Transaction from "../../Transaction";

@Route("transaction/mine/:walletAddress")
@Tags('transaction')
export default class MineTransactionController {
    @Post()
    public async mineTransaction(walletAddress: string): Promise<Array<Transaction>> {
        kobeCoin.minePendingTransactions(walletAddress)
        return kobeCoin.pendingTransactions;
    }
}
