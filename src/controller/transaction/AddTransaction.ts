import {kobeCoin, wallet} from "../../index";
import {Body, Post, Route, Tags} from "tsoa";
import Transaction from "../../Transaction";
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

interface TransactionBody {
    from: string;
    to: string | null;
    amount: number;
}

@Route("transaction/add")
@Tags('transaction')
export default class AddTransactionController {
    @Post()
    public async addTransaction(@Body() requestBody: TransactionBody): Promise<Array<Transaction>> {
        const { from, to, amount } = requestBody
        const tx = new Transaction(from, to, amount)
        const myKey = ec.keyFromPrivate(await wallet.getPrivateKey(from));
        tx.signTransaction(myKey)
        kobeCoin.addTransaction(tx)
        return kobeCoin.pendingTransactions;
    }
}
