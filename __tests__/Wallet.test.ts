import * as fs from "fs";

process.env['TEST'] = 'true'
import Wallet = require("../src/Wallet");
import * as path from "path";
let wallet = new Wallet();

beforeAll(() => {
    const filePath = path.join(process.cwd(), 'db', 'test.wallet.json');
    fs.unlinkSync(filePath);
})

test('should create new wallet', async () => {
    const myWallet = await wallet.createWallet()
    expect(myWallet.length).toEqual(130)
});

test('should topup wallet', async () => {
    const myWallet = await wallet.createWallet()
    await wallet.topup(myWallet, 100)
    const balance = await wallet.getBalance(myWallet)
    expect(balance).toEqual(100)
});

test('should show error when topup wallet is not successful', async () => {
    const log = jest.spyOn(console, 'log')
    const myWallet = '1234'
    await wallet.topup(myWallet, 100)
    expect(log).toHaveBeenCalled()
});

test('should show error when cannot get wallet balance', async () => {
    const myWallet = '12345'
    try {
        await wallet.getBalance(myWallet)
    } catch (e) {
        expect(typeof e).toEqual('object')
    }
});

test('should get signkey', async () => {
    const myWallet = await wallet.createWallet()
    const key = await wallet.getSignKey(myWallet)
    expect(key.toString()).toContain('ec')
});

test('should get private key', async () => {
    const myWallet = await wallet.createWallet()
    const key = await wallet.getPrivateKey(myWallet)
    expect(key.toString().length).toEqual(64)
});
