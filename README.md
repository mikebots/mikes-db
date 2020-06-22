Hello and welcome to Mikes db!
=======
Reminder this database is under work. Please hold as this finishes completly!
This is the official repository for mikes-db. A small light weighted database that uses [Mongoose](https://www.npmjs.com/package/mongoose) and [MongoDB](https://mongodb.com)
This database has features such as some of the following:
 - Caching Data
    This uses cache to help sort the data. 
- Fetching Uncached data
    Fetches the uncached data and makes it cached. Easy to use
- Custom Schemas
    You can make your own schemas!
If you would like to read the starting guide, go to the getting-started folder to get help!

Here are some examples and usage of mikes-db.

_______________________________

# Caching
This database uses a feature called cache to grab all the available online items from the database.
Here's a litle example usage of the cache:
```js
    const cache = new Map();
    (async () =>{
        /*Reminder this can also use the .then method as it returns a promise. We're just using async/await to make it faster!*/
        let dataSet = await MongoDatabase.set(`hi`, { world: `hello` }); /*Returns a promise Data */
        cache.set(dataSet.ID, dataSet.world);
    })();
    /*This sets the cache to the data that you just set so we can recieve it from online*/
    console.log(cache.get(`hi`)) //would return hello
```
# Fetching Uncached Data
This database also has a feature to grab the uncached data aswell
Here's a little example usage
```js
/*Reminder this can also use the .then method as it returns a promise. We're just using async/await to make it faster!*/
(async () =>{
    let dataToFetch = await MongoDatabase.fetch('hi');
    console.log(dataToFetch.world) //would return hello as we did before
})();
```
This also imediatly sets the data to be available and cached once you fetch.

# Custom Schemas
This database also allows you to make custom schemas with the same types: 'ID': The key, 'VALUE': The data value
Here's a little example usage
```js
/*Reminder this can also use the .then method as it returns a promise. We're just using async/await to make it faster!*/
(async () =>{
    const customSchema = await MongoDatabase.addSchema('Custom-Schema');
    const dataSetInNewSchema = await MongoDatabase.set('hi', { world: 'hello'}, customSchema);
    console.log(dataSetInNewSchema.world) //returns hello
})();
```