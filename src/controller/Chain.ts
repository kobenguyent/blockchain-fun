import {kobeCoin} from "../index";
import {Get, Route, Tags} from "tsoa";
import Block from "../Block";
import Transaction from "../Transaction";

interface ChainResponse {
    "chain": Array<Block>,
    "difficulty": number,
    "pendingTransactions": Array<Transaction>,
    "mindingRewards": number
}

@Route("getChain")
@Tags('block')
export default class ChainController {
    @Get()
    public async getChain(): Promise<ChainResponse> {
        return { ...kobeCoin };
    }
}
