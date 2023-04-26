import {db} from "./DB";

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Wallet {
    pubAddress: any;
    privateKey: any;
    signKey: any;
    balance: any;

    async createWallet() {
        const key = ec.genKeyPair()
        this.pubAddress = key.getPublic('hex')
        this.privateKey = key.getPrivate('hex')
        this.signKey = ec.keyFromPrivate(this.privateKey);
        this.balance = 0

        await db.push(`/${this.pubAddress}`, { address: this.pubAddress, privateKey: this.privateKey, signKey: this.signKey, balance: this.balance });
        return this.pubAddress
    }

    async topup(address: string, amount: number) {
        try {
            const currentBalance = await this.getBalance(address)
            await db.push(`/${address}/balance`, currentBalance + amount)
        } catch (e:any) {
            console.log(`Something went wrong! ${e.message}`)
        }
    }

    getBalance(address:string) {
        return db.getData(`/${address}`).then(res => res.balance)
    }

    getSignKey(address:string) {
        return db.getData(`/${address}`).then(res => res.signKey)
    }

    getPrivateKey(address:string) {
        return db.getData(`/${address}`).then(res => res.privateKey)
    }
}

export = Wallet
