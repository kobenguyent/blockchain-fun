import Block = require("./Block");
import Transaction = require("./Transaction");
import Wallet = require("./Wallet");
let wallet = new Wallet();

interface IBlockchain {
    chain: any;
    isValidChain(arg: any): boolean;
}

class Blockchain implements IBlockchain {
    readonly chain: Array<Block>;
    difficulty: number;
    pendingTransactions: any;
    mindingRewards: number;
    constructor() {
        this.chain = [this.genesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.mindingRewards = 10;
    }

    async minePendingTransactions(miningRewardAddress: string) {
        // rewards for miner
        if (miningRewardAddress) {
            this.pendingTransactions.push(new Transaction('system', miningRewardAddress, this.mindingRewards))
        }

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash)
        block.mineBlock(this.difficulty)
        this.chain.push(block)
        for (const tx of this.pendingTransactions) {
            if (tx.toAddress) await wallet.topup(tx.toAddress, tx.amount)
        }
        this.pendingTransactions = []
    }

    addTransaction(transaction: Transaction) {

        if (!transaction.fromAddress || !transaction.toAddress) throw Error('Transaction must have from and to address')

        if (!transaction.isValid()) throw Error('Cannot add invalid transaction to chain')

        this.pendingTransactions.push(transaction)
    }

    genesisBlock() {
        console.log('⏳ Initializing the blockchain, creating the genesis block...');
        return new Block(Date.now(), `genesis block`, '0')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const lastBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransaction())  return false;
            if (currentBlock.prevHash !== lastBlock.hash) return false;
            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
        }

        return true;
    }

    async getBalanceOfAddress(address: string) {
        let balance = await wallet.getBalance(address)

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address) {
                    balance -= tx.amount
                }

                if (tx.toAddress === address) {
                    balance += tx.amount
                }
            }
        }

        return balance;
    }
}

export = Blockchain
