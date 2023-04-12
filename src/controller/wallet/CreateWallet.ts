import {wallet} from "../../index";
import {Post, Route, Tags} from "tsoa";
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

interface TransactionBody {
    from: string;
    to: string | null;
    amount: number;
}

@Route("wallet/create")
@Tags('wallet')
export default class CreateWalletController {
    @Post()
    public async createWallet() {
        const myWallet = await wallet.createWallet()
        const key = await wallet.getSignKey(myWallet)
        return { walletAddress: myWallet };
    }
}
