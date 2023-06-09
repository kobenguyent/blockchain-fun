const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
class Transaction {
    fromAddress: string | null;
    toAddress: string | null;
    amount: number;
    private signature: any;
    timestamp: number;

    constructor(fromAddress: string | null, toAddress: string | null, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now()
    }

    calculateHash() {
        if (this.fromAddress || this.fromAddress) return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
    }

    signTransaction(signingKey:any) {
        if (!signingKey) throw Error('Please check your signKey')
        if (signingKey.getPublic('hex') !== this.fromAddress) throw Error('You cannot sign transactions for other wallets!')

        const hashTx = this.calculateHash()
        const signature = signingKey.sign(hashTx, 'base64')
        this.signature = signature.toDER('hex')
    }

    isValid() {
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) throw Error('No signature in this transaction')

        const pubKey = ec.keyFromPublic(this.fromAddress, 'hex')
        return pubKey.verify(this.calculateHash(), this.signature)
    }
}

export = Transaction
