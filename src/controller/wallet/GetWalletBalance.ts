import {wallet} from "../../index";
import {Get, Route, Tags} from "tsoa";

@Route("wallet/balance/:walletAddress")
@Tags('wallet')
export default class GetWalletBalanceController {
    @Get()
    public async getWalletBalance(walletAddress: string) {
        try {
            const balance = await wallet.getBalance(walletAddress)
            return { balance };
        } catch (e:any) {
            console.log(`Something went wrong ${e.message}`)
        }
    }
}
