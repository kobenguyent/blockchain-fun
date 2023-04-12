const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const key = ec.genKeyPair()
const pubKey = key.getPublic('hex')
const privateKey = key.getPrivate('hex')

const signKey = ec.keyFromPrivate(privateKey);

export { pubKey, privateKey, signKey }
