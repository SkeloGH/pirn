import { MongoClient, Db } from 'mongodb'
import { LOCAL_MDB_URL, TEST_DB_NAME } from '../__mock__';

const client = new MongoClient(LOCAL_MDB_URL);
let db: Db;


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(TEST_DB_NAME);
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
    const insertedUser = await client.db(TEST_DB_NAME)
      .collection('users').findOne({ name: 'John' });
    expect(insertedUser?.name).toEqual('John');
  });
});
