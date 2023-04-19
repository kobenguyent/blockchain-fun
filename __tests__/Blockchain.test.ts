process.env['TEST'] = 'true'
import Wallet = require("../src/Wallet");
let wallet = new Wallet();

import {blockChainSchema} from "../src/schema/schema";
import Transaction = require("../src/Transaction");
let tx:Transaction

const Blockchain = require("../src/Blockchain");
const kobeCoin = new Blockchain();

test('should create the blockchain', () => {
    const res = blockChainSchema.validate(kobeCoin)
    expect(res.error).toBeFalsy()
})

test('should get the blockchain', () => {
    expect(kobeCoin.getLatestBlock().transactions).toEqual('genesis block')
})

test('should return if the chain is valid', () => {
    expect(kobeCoin.isValidChain()).toBeTruthy()
})

test('should throw error when tx is with no from and to address', () => {
    try {
        tx = new Transaction(null, null, 10);
        kobeCoin.addTransaction(tx)
    } catch (e: any) {
        expect(e.message).toEqual('Transaction must have from and to address')
    }
})

test('should throw error when tx could not be added to pending tx', () => {
    try {
        tx = new Transaction('from', 'to', 10);
        kobeCoin.addTransaction(tx)
    } catch (e: any) {
        expect(e.message).toEqual('No signature in this transaction')
    }
})

test('should add valid tx to blockchain', async () => {
    const myWallet = await wallet.createWallet()
    const myWallet1 = await wallet.createWallet()
    const myKey = await wallet.getSignKey(myWallet)
    tx = new Transaction(myWallet, myWallet1, 10);
    tx.fromAddress = myWallet

    tx.signTransaction(myKey)

    kobeCoin.addTransaction(tx)
    expect(kobeCoin.pendingTransactions[0].fromAddress).toEqual(myWallet)
    expect(kobeCoin.pendingTransactions[0].toAddress).toEqual(myWallet1)

    await kobeCoin.minePendingTransactions(myWallet)
    expect(kobeCoin.chain.length).toEqual(2)
    expect(kobeCoin.isValidChain()).toBeTruthy()

    expect(await kobeCoin.getBalanceOfAddress(myWallet)).toEqual(10)
    expect(await kobeCoin.getBalanceOfAddress(myWallet1)).toEqual(20)
})
