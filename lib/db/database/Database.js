const { Schema, models, model} = require('mongoose');
const mongoose = require('mongoose');
const Database = require(`../utils/Database`);
const { inspect } = require('util');
const fs = require('fs')
class MongoDatabase {
    constructor(options) {
       
         mongoose.connect(options.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(d => console.log(`Connected to the Mongo Database`)).catch(err =>{
            
             console.log(`Database connection destroyed error happened.`, err);
             return this.destroy();
        });
        this.dbutil = new Database(this);
        this.schemas = new Object();
        this.schemas["DEFAULT"] = model('DEFAULT', new Schema({
            ID: Schema.Types.Mixed,
            VALUE: Schema.Types.Mixed,
            AVAILABLE: Boolean,
            CACHED: Boolean
        }));
        this.logFile = options.logFile || 'db-logs.log'
    }
    /**
     * Sets a key onto the schema.
     * Returns a database. You can see the whole database class in our utils folder!
     * @returns {Promise<Database>}
     * @param {any} key - The key to set
     * 
     * @param {any} value - the value to set
     * @param {string?} schema - The schema to set. If not found or null it will use the default schema
     * @example 
     * MongoDatabase.set(`hello`, { world: 'earth'}).then(Data => console.log(Data.world)).catch(err=> console.log('An error happened.', err));
     * 
     * 
     */
    
   
    async set(key, value){
        return this.dbutil.set(key, value);
    }
    async get(key){
        return this.dbutil.get(key);
    }
    async fetch(key){
        return this.dbutil.fetch(key);
    }

}

module.exports = MongoDatabase;