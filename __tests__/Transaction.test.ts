import Transaction = require("../src/Transaction");
const Joi = require('joi');

const txSchema = Joi.object({
    fromAddress: Joi.string(),
    toAddress: Joi.string(),
    amount: Joi.number(),
    timestamp: Joi.number()
})

let tx:Transaction

beforeEach(() => {
    tx = new Transaction('from', 'to', 10);
})

test('should create new block', () => {
    const res = txSchema.validate(tx)
    expect(res.error).toBeFalsy()
});


test('should calculate hash', () => {
    const result = tx.calculateHash()
    expect(result.length).toEqual(64)
});

test('should throw error when using invalid sign key', () => {
    try {
         tx.signTransaction('')
    } catch (e: any) {
        expect(e.message).toEqual('Please check your signKey')
    }

    try {
        tx.signTransaction('from')
    } catch (e: any) {
        expect(e.message).toEqual('signingKey.getPublic is not a function')
    }
});

test('should return true when fromAddress is null', () => {
    tx.fromAddress = null
    const result = tx.isValid()
    expect(result).toBeTruthy()
});

test('should throw error when no signature is provided', () => {
    try {
        tx.isValid()
    } catch (e: any) {
        expect(e.message).toEqual('No signature in this transaction')
    }
});

test('should return true when fromAddress is valid', () => {
    const { pubKey, signKey } = require('../src/KeyGenerator')
    tx.fromAddress = pubKey
    tx.signTransaction(signKey)
    const result = tx.isValid()
    expect(result).toBeTruthy()
});
