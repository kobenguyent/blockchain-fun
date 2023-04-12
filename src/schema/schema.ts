const Joi = require('joi');

export const blockSchema = Joi.object({
    timestamp: Joi.string(),
    transactions: Joi.string(),
    prevHash: Joi.string(),
    hash: Joi.string(),
    nonce: Joi.number()
})

export const blockChainSchema = Joi.object({
    chain: Joi.array(),
    difficulty: Joi.number(),
    pendingTransactions: Joi.array(),
    mindingRewards: Joi.number()
})
