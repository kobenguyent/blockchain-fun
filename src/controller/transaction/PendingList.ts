import {kobeCoin} from "../../index";
import {Get, Route, Tags} from "tsoa";
import Transaction from "../../Transaction";


@Route("transaction/pendingList")
@Tags('transaction')
export default class PendingListController {
    @Get()
    public async getPendingTransactionList(): Promise<Array<Transaction>> {
        return kobeCoin.pendingTransactions;
    }
}
