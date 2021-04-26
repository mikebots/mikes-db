Welcome to Mikes-db!
=======
A simple mongoose wrapper and client with TypeScript. 
To install the client use 
```txt 
npm install mikes-db
```

# Getting-Started

- Making the MongoClient
    ```js
    //creating the client
    const { MongoClient } = require("mikes-db");
    //using import
    import { MongoClient } from "mikes-db"

    const client = new MongoClient({
        mongouri: 'mongodb://localhost/dbName', //our mongo uri but you can use any
        mongo: { //atleast one option is required
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        cache: true, //letting us use cached data
        cacheOnStartUp: true, //Caching data on startup
        cacheSize: 100 //Maximum cache size
    });
    client.connect() //connects to the client. A connection is needed to be able to use the set,fetch and get function
    ```
What we just did here was make a new mongo client and connect it to be able to use the key functions.

======

# [Client.connect()](https://github.com/mikebots/mikes-db/blob/main/src/classes/MongoClient.ts)
Lets talk about what this does
```js
client.connect()
```

