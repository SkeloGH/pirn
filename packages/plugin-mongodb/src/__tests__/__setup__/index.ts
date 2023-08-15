import { MongoClient, Db } from 'mongodb'

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'pirn-plugin-mongodb-test';
let db: Db;


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  return db
}
beforeAll(async () => {
  db = await main()
});

afterAll(async () => {
  const users = db.collection('users');
  await users.deleteMany({});
  await client.close();
});

describe('Test database', () => {
  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
    await users.insertOne({ name: 'John' });
    const insertedUser = await client.db(dbName).collection('users').findOne({ name: 'John' });
    expect(insertedUser?.name).toEqual('John');
  });
});
