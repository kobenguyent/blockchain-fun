import Block = require("../src/Block");
import Transaction = require("../src/Transaction");
const Joi = require('joi');

const blockSchema = Joi.object({
    timestamp: Joi.string(),
    transactions: Joi.string(),
    prevHash: Joi.string(),
    hash: Joi.string(),
    nonce: Joi.number()
})

let block:Block

beforeEach(() => {
    block = new Block(Date.now(), 'test tx', '0');
})

test('should create new block', () => {
    blockSchema.validate(block)
});

test('should return block info', () => {
    const result = block.toString()
    expect(result).toContain('Block -')
    expect(result).toContain('Timestamp :')
    expect(result).toContain('Last Hash :')
    expect(result).toContain('Hash :')
    expect(result).toContain('Data')
});


test('should calculate hash', () => {
    const result = block.calculateHash()
    expect(result.length).toEqual(64)
});

test('should mine block', () => {
    const log = jest.spyOn(console, 'log')
    const result = block.mineBlock(2)
    expect(log).toHaveBeenCalled()
});

test('should validate transaction', () => {
    block.transactions = [new Transaction('from', 'to', 10)]
    try {
        const result = block.hasValidTransaction()
    } catch (e: any) {
        expect(e.message).toEqual('No signature in this transaction')
    }
});
