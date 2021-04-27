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
    import { MongoClient } from "mikes-db";

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
    client.on('CONNECTION_FOUND', (uri) => console.log(`Found a connection at ${uri}!`)); //A connection found event that is triggered whenever we call connect()

    client.on('CONNECTION_CREATE', async(connection, uri) => {
        client.logger.log('CONNECTION_CREATE', `Successfully connected to the database using ${uri}!`);

        //setting data. Note: you do not need to set data in tis event. You just need to make sure you are connected

        let users = [
            {
                name: 'Johnson',
                balance: 44, //in dollars
                pay(amount) {
                    this.balance += amount;
                    return { name: this.name, balance: this.balance}
                }
            },
              {
                name: 'David',
                balance: 112, //in dollars
                pay(amount) {
                    this.balance += amount;
                    return this;
                }
            }
        ];
        //a mini array holding our users. Note: this is for an example. You do not need to make an array of users when setting data
        function getUser(name){
            return users.find((user)=>user.name===name)
        };

        let user = getUser('David').pay(100)
        await client.set(user.name, user.balance)
            .catch((err)=>console.error(err));
       
        
    })
    
    client.on('SET', (key, value, successfull) =>{
        console.log(`Successfully set a key of: ${key} to a value of: `, value, "!");
         //Output: Successfully set a key of David to a value of: 212!
    })
    

    client.connect(); //connects to the client. A connection is needed to be able to use the set,fetch and get function
    ```
<p>What we just did here was make a new mongo client and connect it to be able to use the key functions.</p>


# [Client.connect()](https://github.com/mikebots/mikes-db/blob/main/src/classes/MongoClient.ts)
Lets talk about what this does
```js
client.connect()
```
This creates a connection to mongo with your mongodb url that you've provided. Using this method triggers the `CONNECTION_CREATE` event and the `CONNECTION_FOUND` event.



# Support Server
Join us at https://discord.gg/FYFDHBG to get help!
