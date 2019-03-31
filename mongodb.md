# MongoDB

## Installing MongoDB

#### macOS
- homebrew: `brew install mongodb`
- [site install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
#### windows
- [site install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

#### Docker & Kitematic
_(TDB)_

## Installing Compass

#### macOS
- homebrew: `brew cask install mongodb-compass-community`
- [site install](https://www.mongodb.com/download-center/compass)
  > Select "Community Edition Stable" version.

#### windows
- [site install](https://www.mongodb.com/download-center/compass)
  > Select "Community Edition Stable" version

## Using Compass To Explore a Database

1. Run mongodb process in a terminal window
>**macOS**: `mongod --config /usr/local/etc/mongod.conf`

> **windows**: `"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"`

2. Open Compass
3. Connect to default `localhost:27017`
4. Create a database: `hackeryou`
![create-database](https://user-images.githubusercontent.com/2818462/55284673-5d077a80-5349-11e9-8257-f98109d8a7c2.png)
5. Create a collection: `users`
![create-collection](https://user-images.githubusercontent.com/2818462/55284719-0d757e80-534a-11e9-837c-5b1e35bf1069.png)

#### Task 1
Add some users to your `users` collection.
> Lets take note of the property types

#### Task 2
Create a new collection
![create-collection](https://user-images.githubusercontent.com/2818462/55284727-562d3780-534a-11e9-85b6-78e39a543b45.png)

#### Task 3
Filtering with Compass
https://docs.mongodb.com/compass/current/query-bar/#query-bar-filter
1. Connect to educational mongodb instance
2. Try out filters
> `{ year: 1986, genre: { $regex: 'Action' } }`

## Exploring MongoDB With Shell Client

1. Make sure mongodb process is running in a terminal window
> `mongod --config /usr/local/etc/mongod.conf`
2. Connect to your running mongodb instance with the `mongo` shell client
> `mongo localhost:27017`
3. List all databases
> `show dbs`
4. "connect" to our `hackeryou` database
> `use hackeryou`


### Mongo Methods
`db.{collection-name}.find()`

`db.{collection-name}.count()`

`db.{collection-name}.next()`

`db.{collection-name}.find({ ... options ... })`

`db.{collection-name}.createCollection()`

`db.{collection-name}.insert()`

`db.{collection-name}.remove()`

## Exploring MongoDB With NodeJS

> `npm install mongodb`

```javascript
'use strict';

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbname = 'hackeryou';

MongoClient.connect(url, (err, client) => {
  console.log(`Connected to server: ${url}`);
  const db = client.db(dbname);

  client.close();
});
```

```javascript
const { MongoClient } = require('mongodb');

// Connection url
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// Connect using MongoClient
MongoClient.connect(url, function(err, client) {

// Create a collection we want to drop later
  const col = client.db(dbName).collection('createIndexExample1');

// Insert a bunch of documents
  col.insert(
    [
      {a:1, b:1},
      {a:2, b:2},
      {a:3, b:3},
      {a:4, b:4},
    ],
    {w:1},
    function(err, result) {

      col.find({}).toArray(function (err, items) {
        console.log('items:', items);
        client.close();
      });
  });
});
```
