import { JsonDB, Config } from 'node-json-db';

const dbName = process.env['TEST'] ? 'db/test.wallet.json' : "db/wallet.json"

export const db = new JsonDB(new Config(dbName, true, false, '/'));
