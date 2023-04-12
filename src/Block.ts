import Transaction from "./Transaction";

const SHA256 = require('crypto-js/sha256');
declare interface IBlock {
    timestamp: number;
    transactions: Array<Transaction>;
    prevHash: string;
    hash: string;
    nonce?: number;
    toString(): string;
}
class Block implements IBlock {
    timestamp: number;
    transactions: any;
    prevHash: string;
    hash: string;
    nonce: number;
    constructor(timestamp: number, transactions: string, prevHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    toString() {
        return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.prevHash}
        Hash      : ${this.hash}
        Data      : ${this.transactions}`
    }

    calculateHash() {
        return SHA256(`${this.timestamp}${this.prevHash}${this.transactions}${this.nonce}`).toString();
    }

    mineBlock(difficulty: any) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty +1).join('2')) {
            this.nonce++;
            this.hash = this.calculateHash()
        }
        console.log('Block mined: ' + this.hash)
    }

    hasValidTransaction() {
        for (const tx of this.transactions) {
            return tx.isValid()
        }
    }
}

export = Block
