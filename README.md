# Pirn

Pirn is a data extraction/load tool that can be used to extract data from one or more data sources and load it into one or more data sources. It can be used to migrate data from one data source to another, or to synchronize data between data sources.

Key features:

- Configurable source queries to start from a base set of documents
- Supports multiple source and target databases, and database types via plugins
- Copies related documents by following reference fields

## Installation

```bash
npm install --save @pirn/pirn-core
```

## Usage

```javascript
import { Pirn } from '@pirn/pirn-core';

const pirn = new Pirn();
```

### Defining clients

Clients are used to connect to the data stores. Depending on the type of data store, different clients are available and are installed separately. See [Plugins](#plugins) for more information.

There are two types of clients: source and target. Source clients are used to extract data. Target clients are used to load data. A target client must have a `source` property that references the `clientId` of a source client. The `source` property must be set before calling `connect()`.

Each client must have a unique `clientId` property. The `clientId` is used to reference the client in queries. The `clientId` can be any string, but it is recommended to use a descriptive name. The `clientId` must be set before calling `connect()`. The `clientId` must be unique across all clients. If two clients have the same `clientId`, an error will be thrown. If the `clientId` is not set, it will be set to a random string.

```javascript
import { Client as MongodbClient } from '@pirn/pirn-plugin-mongodb';
import { Client as CouchdbClient } from '@pirn/pirn-plugin-couchdb';

const sourceClientA = new MongodbClient({
  type: 'source',
  clientId: 'remote-mongodb',
  db: {
    url: REMOTE_MONGODB_URL,
    name: 'mongodb-production',
  }
});

const targetClientA = new CouchdbClient({
  type: 'target',
  clientId: 'local-couchdb',
  source: sourceClientA.clientId, // <- This is the clientId of the source client defined above
  db: {
    url: LOCAL_COUCHDB_URL,
    name: 'couchdb-development',
  }
});
```

Depending on the type of data source, different options are available. See [Client Options](#client-options) for more information.

### Defining queries

Queries are used to fetch data from the clients. The results of the queries will be used to fetch related documents. See [Queries](#queries) for more information.

```javascript
const initialQuery = {
  key: 'get-prod-products',
  clientId: sourceClientA.clientId,
  from: ['products'],
  where: {
    keys: ['_id'],
    operator: 'in',
    value: ['abc123-xyz4-1234-1234-1234567890ab', 'abc123-xyz4-1234-1234-1234567890ac'],
  }
};
```

### Putting it all together

```javascript
const pirn = new Pirn();

pirn.setJSONDumpPath(`${process.env.CWD}/results.json`);
pirn.addQueries([ initialQuery ]);

await pirn.addClients([ sourceClientA, targetClientA]);
await pirn.connectAll();
await pirn.fetch();
await pirn.dump();
await pirn.disconnectAll();
```

### Requirements

- Node.js 14 or higher

## Pirn API

### class Pirn

Pirn is the main class that orchestrates the data extraction and load process. It is responsible for connecting to the data sources, fetching the data, and dumping the data to the target data sources or JSON file. It is the only class that needs to be instantiated.

#### `addClient(client: Client)`

Adds a client to the Pirn instance. The client must be added before calling `connect()`. The client must have a unique `clientId` property. See [Client Options](#client-options) for more information. Client classes are available as plugins. See [Plugins](#plugins) for more information.

#### `addClients(clients: Client[])`

Adds multiple `Client` instances to the Pirn instance. See `addClient()` for more information.

#### `removeClient(clientId: string)`

Closes the connection to the client and removes the client from the list of clients. Returns the list of `clients`.

#### `removeClients(clientIds: string[])`

Removes multiple clients from the Pirn instance.

#### `getClient(clientId: string)`

Returns the client with the specified `clientId`.

#### `getClients()`

Returns the list of clients.


#### `setJSONDumpPath(path: string)`

Sets the path to the JSON dump file. If the path is not set, the JSON dump file will not be created. The path must be set before calling `dump()`. The path must be a valid path to a JSON file. If the file does not exist, it will be created. If the file exists, it will be overwritten. See [dump()](#dump) for more information.

#### `getJSONDumpPath()`

Returns the path to the JSON dump file.

#### `addQuery(query: Query)`

Adds a query to be executed. Depending on the query, it may be executed on all clients, or on a specific client. The query must be added before calling `fetch()`. Returns the `queries` array. See [Queries](#queries) for more information.

#### `addQueries(queries: Query[])`

Adds multiple queries to be executed. See `addQuery()` for more information.

#### `removeQuery(queryKey: string)`

Removes a query from the list of queries. Returns the `queries` array.

#### `removeQueries(queryKeys: string[])`

Removes multiple queries from the list of queries. See `removeQuery()` for more information.

#### `getQuery(queryKey: string)`

Returns the query with the specified `queryKey`.

#### `getQueries()`

Returns the list of queries.

#### `addIgnoreField(clientId: string, field: string)`

Adds a field to ignore when fetching data from a client. The field will be ignored for all queries executed on the client. If no clientId is provided, the field will be ignored for all clients. The field must be added before calling `fetch()`. Returns the `ignoreFields` array. See [Client Options](#client-options) for more information.

Example:

```javascript
pirn.addIgnoreField('sourceA', 'password');
pirn.addIgnoreField('sourceB', 'password');
```

In the example above, the `password` field will be ignored for all queries executed on the `sourceA` and `sourceB` clients.

#### `addIgnoreFields(clientId: string, fields: string[])`

Adds multiple fields to ignore when fetching data from a client or clients. See `addIgnoreField()` for more information.

#### `getIgnoreFields(clientId: string)`

Returns the list of fields to ignore for the specified client. If no clientId is provided, the list of fields to ignore for all clients will be returned.

#### `removeIgnoreField(clientId: string, field: string)`

Removes a field from the list of fields to ignore for the specified client. If no clientId is provided, the field will be removed from the list of fields to ignore for all clients. Returns the `ignoreFields` array.

#### `removeIgnoreFields(clientId: string, fields: string[])`

Removes multiple fields from the list of fields to ignore for the specified client or clients. See `removeIgnoreField()` for more information.

#### `addIgnoreTable(clientId: string, table: string)` or `addIgnoreCollection(clientId: string, collection: string)`

Adds a table/collection to ignore when fetching data from a client. The table/collection will be ignored for all queries executed on the client. The table/collection must be added before calling `fetch()`. Returns the `ignoreTables` array. See [Client Options](#client-options) for more information.

Example:

```javascript
pirn.addIgnoreTable('sourceA', 'passwords');
pirn.addIgnoreCollection('sourceB', 'passwords');
```

In the example above, the `passwords` table/collection will be ignored for all queries executed on the `sourceA` and `sourceB` clients.

#### `addIgnoreTables(clientId: string, tables: string[])` or `addIgnoreCollections(clientId: string, collections: string[])`

Adds multiple tables/collections to ignore when fetching data from a client. See `addIgnoreTable()` or `addIgnoreCollection()` for more information.

#### `getIgnoreTables(clientId: string)` or `getIgnoreCollections(clientId: string)`

Returns the list of tables/collections to ignore for the specified client. If no clientId is provided, the list of tables/collections to ignore for all clients will be returned.

#### `connectAll()`

Connects to all clients. This must be called before calling `fetch()`. Returns a promise that resolves when all clients are connected. If `autoConnect` is set to `true` in the client options, this method does not need to be called. See [Client Options](#client-options) for more information.

#### `connect(clientId: string)`

Connects to the specified client. This must be called before calling `fetch()`. Returns a promise that resolves when the client is connected. If `autoConnect` is set to `true` in the client options, this method does not need to be called. See [Client Options](#client-options) for more information.

#### `fetch()`

Fetches the data from the clients. This must be called before calling `dump()`. Returns a promise that resolves when all data is fetched. This method could take a while to complete, depending on the amount of data being fetched.

#### `dump()`

Dumps the data to the target clients. This must be called before calling `disconnectAll()`. Returns a promise that resolves when all data is dumped. If the JSON dump path is set, the data will be dumped to the JSON file and target clients. If the JSON dump path is not set, the data will only be dumped to the target clients.

#### `disconnectAll()`

Disconnects from all clients. This must be called before calling `connect()`. Returns a promise that resolves when all clients are disconnected.

#### `disconnect(clientId: string)`

Disconnects from the specified client. This must be called before calling `connect()`. Returns a promise that resolves when the client is disconnected.

## Client Options

The following options can be set on a client:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `autoConnect` | `boolean` | `true` | If `true`, the client will automatically connect when `connect()` is called. |
| `ignoreFields` | `string[]` | `[]` | An array of fields to ignore when fetching data. See [addIgnoreField()](#addignorefieldclientid-string-field-string) for more information. |
| `ignoreTables` | `string[]` | `[]` | An array of tables/collections to ignore when fetching data. See [addIgnoreTable()](#addignoretableclientid-string-table-string) or [addIgnoreCollection()](#addignorecollectionclientid-string-collection-string) for more information. |

## Queries

Queries are used to fetch data from the clients. Queries can be added to the Pirn instance before calling `fetch()`. See [Pirn API](#pirn-api) for more information.

### Query

A query is an object that contains the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `clientId` | `string` | The client ID to execute the query on. If not set, the query will be executed on all clients. |
| `from` | `string[]` | An array of tables/collections to fetch data from. If not set, the query will be executed on all tables/collections. |
| `where` | `string \| object` | A string or object that represents the WHERE clause of the query. If not set, the query will not fetch any data from the tables/collections. |

#### Where

The `where` property of a query can be a string or an object. If it is a string, it will be used as the WHERE clause of the query. If it is an object, it will be used to build the WHERE clause of the query. The object can have the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `keys` | `string[]` | An array of keys to use in the WHERE clause. |
| `operator` | `string` | The operator to use in the WHERE clause. |
| `value` | `string \| string[] \| object \| object[]` | The value to use in the WHERE clause. |

If the `where` property is an array of strings or objects, the query will be executed multiple times, once for each string or object in the array.

#### Operators

The following operators can be used in the `where` property of a query:

| Operator | Description |
| --- | --- |
| `eq` | Equal to |
| `like` | Like |
| `in` | In array |

Support for more operators will be added in the future. Please be aware that a query that is too broad could take a long time to execute.

### Values

The following values can be used in the `where` property of a query:

| Value | Description |
| --- | --- |
| `string` | A string value. |
| `object` | An object value. |
| `array` | An array of strings or objects. |

The reason why only these value types are supported is to control the size of the initial query. If the query is too broad, it could take a long time to execute.

### Example

#### Fetch all documents from the `users` table/collection where the `last_name` field contains `Doe` and the `first_name` field is exactly `John` (case-sensitive).

```javascript
const query = {
  from: ['users'],
  where: [
    "last_name LIKE '%Doe%'",
    { first_name: 'John' },
  ],
};
```

#### Fetch a document from any collection where the `_id` field is a given `ObjecId`.

```javascript
const query = {
  from: ['users'],
  where: { _id: ObjectId('abc123-xyz4-1234-1234-1234567890ab') },
};
```

## Plugins

Plugins can be created to support different data sources. Plugins are classes that extend the `Client` class. To create a plugin, see [Contributing](#contributing) for more information.

### Available Plugins

| Plugin | Description |
| --- | --- |
| [@pirn/pirn-cli](https://npmjs.com/package/@pirn/pirn-cli) | CLI |
| [@pirn/pirn-plugin-mongodb](https://npmjs.com/package/@pirn/pirn-plugin-mongodb) | MongoDB client |

### Future Plugins - help wanted!

| Plugin | Description |
| --- | --- |
| [@pirn/pirn-plugin-graphviz](https://npmjs.com/package/@pirn/pirn-plugin-graphviz) | Generates a Graphviz DOT file that can be used to visualize the data relationships |
| [@pirn/pirn-plugin-pg](https://npmjs.com/package/@pirn/pirn-plugin-pg) | PostgreSQL client |
| [@pirn/pirn-plugin-mariadb](https://npmjs.com/package/@pirn/pirn-plugin-mariadb) | MariaDB client |
| [@pirn/pirn-plugin-mysql](https://npmjs.com/package/@pirn/pirn-plugin-mysql) | MySQL client |
| [@pirn/pirn-plugin-elasticsearch](https://npmjs.com/package/@pirn/pirn-plugin-elasticsearch) | Elasticsearch client |
| [@pirn/pirn-plugin-redis](https://npmjs.com/package/@pirn/pirn-plugin-redis) | Redis client |
| [@pirn/pirn-plugin-memcached](https://npmjs.com/package/@pirn/pirn-plugin-memcached) | Memcached client |
| [@pirn/pirn-plugin-sqlite](https://npmjs.com/package/@pirn/pirn-plugin-sqlite) | SQLite client |
| [@pirn/pirn-plugin-cassandra](https://npmjs.com/package/@pirn/pirn-plugin-cassandra) | Cassandra client |
| [@pirn/pirn-plugin-dynamodb](https://npmjs.com/package/@pirn/pirn-plugin-dynamodb) | DynamoDB client |
| [@pirn/pirn-plugin-mssql](https://npmjs.com/package/@pirn/pirn-plugin-mssql) | MSSQL client |
| [@pirn/pirn-plugin-neo4j](https://npmjs.com/package/@pirn/pirn-plugin-neo4j) | Neo4j client |
| [@pirn/pirn-plugin-couchdb](https://npmjs.com/package/@pirn/pirn-plugin-couchdb) | CouchDB client |
| [@pirn/pirn-plugin-sqlserver](https://npmjs.com/package/@pirn/pirn-plugin-sqlserver) | SQL Server client |
| [@pirn/pirn-plugin-sqlite3](https://npmjs.com/package/@pirn/pirn-plugin-sqlite3) | SQLite3 client |
| [@pirn/pirn-plugin-oracle](https://npmjs.com/package/@pirn/pirn-plugin-oracle) | Oracle client |
| [@pirn/pirn-plugin-teradata](https://npmjs.com/package/@pirn/pirn-plugin-teradata) | Teradata client |
| [@pirn/pirn-plugin-snowflake](https://npmjs.com/package/@pirn/pirn-plugin-snowflake) | Snowflake client |
| [@pirn/pirn-plugin-bigquery](https://npmjs.com/package/@pirn/pirn-plugin-bigquery) | BigQuery client |
| [@pirn/pirn-plugin-firestore](https://npmjs.com/package/@pirn/pirn-plugin-firestore) | Firestore client |
| [@pirn/pirn-plugin-dynamodb](https://npmjs.com/package/@pirn/pirn-plugin-dynamodb) | DynamoDB client |
| [@pirn/pirn-plugin-azure-table](https://npmjs.com/package/@pirn/pirn-plugin-azure-table) | Azure Table client |
| [@pirn/pirn-plugin-aws-dynamodb](https://npmjs.com/package/@pirn/pirn-plugin-aws-dynamodb) | AWS DynamoDB client |

If you would like to contribute a plugin, please see [Contributing](#contributing) for more information. If you would like to request a plugin, please open an issue.

## Contributing

Contributions are welcome. Please read the [Contributing Guidelines](CONTRIBUTING.md) for more information.


## License

MIT

## Author

[Aaron Gonzalez](https://prodev.blog/authors/aaron-gonzalez/)

