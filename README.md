[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/peternguyew)
# KobeCoin
---

*⚠️ For education purposes only. This is by no means a complete implementation, and it is of course by no means secure!*

## Features

* Simple proof-of-work algorithm
* Verify blockchain (to prevent tampering)
* Generate wallet (private/public key)
* Sign transactions

## Getting Started

### Install library
```
npm i
```

### Generate a keypair
To make transactions on this blockchain you need a keypair. The public key becomes your wallet address and the private key is used to sign transactions.

```js
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.genKeyPair();
```

The `myKey` object now contains your public & private key:

```ts
console.log('Public key:', myKey.getPublic('hex'));
console.log('Private key:', myKey.getPrivate('hex'));
```

### Create a blockchain instance
Now you can create a new instance of a Blockchain:

```ts
const Blockchain = require("../src/Blockchain");
const kobeCoin = new Blockchain();
```

### Adding transactions
```js
// Transfer 100 coins from my wallet to "toAddress"
const tx = new Transaction(myWalletAddress, 'toAddress', 100);
tx.sign(myKey);

myChain.addTransaction(tx);
```

To finalize this transaction, we have to mine a new block. We give this method our wallet address because we will receive a mining reward:

```js
myChain.minePendingTransactions(myWalletAddress);
```

### Start blockchain node locally

````
npm run dev

tth~$npm run dev

> blockchain-fun@1.0.0 predev
> npm run swagger


> blockchain-fun@1.0.0 swagger
> tsoa spec


> blockchain-fun@1.0.0 dev
> concurrently "nodemon" "nodemon -x tsoa spec"

[0] [nodemon] 2.0.22
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): src/**/*
[0] [nodemon] watching extensions: ts
[0] [nodemon] starting `ts-node src/index.ts`
[1] [nodemon] 2.0.22
[1] [nodemon] to restart at any time, enter `rs`
[1] [nodemon] watching path(s): src/**/*
[1] [nodemon] watching extensions: ts
[1] [nodemon] starting `tsoa spec`
[1] [nodemon] clean exit - waiting for changes before restart
[0] ⏳ Initializing the blockchain, creating the genesis block...
[0] ⚡️[server]: Server is running at http://localhost:8000


````

### Swagger Docs

After starting the server, docs would be available at http://localhost:8000/api-docs/


### Tests

````
npm run test

tth~$npm run test

> blockchain-fun@1.0.0 test
> jest --coverage

 PASS  __tests__/Block.test.ts
  ● Console

    console.log
      Block mined: 22af7ed07bc0443ee50ff231970231113a494a29524259d6194faa0e420a5292

      at console.<anonymous> (node_modules/jest-mock/build/index.js:709:23)

 PASS  __tests__/Wallet.test.ts
 PASS  __tests__/Transaction.test.ts
 PASS  __tests__/Blockchain.test.ts
  ● Console

    console.log
      ⏳ Initializing the blockchain, creating the genesis block...

      at Blockchain.log [as genesisBlock] (src/Blockchain.ts:45:17)

    console.log
      Block mined: 22e330f4529d8e569ba5b7385eab6a80cd1929fcdb323a3836ea8aeb548c8f36

      at Block.log [as mineBlock] (src/Block.ts:43:17)

    console.log
      Block mined: 225d9cd1da0f4abb574b1f49a48e2f63ffdf8f8a805740e0a6d1d6129851bdb3

      at Block.log [as mineBlock] (src/Block.ts:43:17)

------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |   93.96 |     61.9 |      92 |   98.98 |                   
 src              |    93.8 |     61.9 |      92 |   98.95 |                   
  Block.ts        |     100 |        0 |     100 |     100 | 18                
  Blockchain.ts   |   91.11 |    55.55 |     100 |     100 | 39-60             
  DB.ts           |     100 |       50 |     100 |     100 | 3                 
  KeyGenerator.ts |     100 |      100 |     100 |     100 |                   
  Transaction.ts  |   95.45 |    77.77 |     100 |     100 | 17,22             
  Wallet.ts       |   89.47 |      100 |      75 |   93.75 | 37                
 src/schema       |     100 |      100 |     100 |     100 |                   
  schema.ts       |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        3.144 s
Ran all test suites.

````
