const { Schema, models, model} = require('mongoose');
const mongoose = require('mongoose');
const Database = require(`../utils/Database`);
class MongoDatabase extends Database{
    constructor(options) {
        super(this)
        await mongoose.connect(options.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(d => console.log(`Connected to the Mongo Database`)).catch(err =>{
            
             console.log(`Database connection destroyed error happened.`, err);
             return this.destroy();
        });
        this.schemas = new Object();
        this.schemas["DEFAULT"] = model('DEFAULT', new Schema({
            ID: Schema.Types.Mixed,
            VALUE: Schema.Types.Mixed,
            AVAILABLE: Boolean,
            CACHED: Boolean
        }));

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
    
    async set(key, value, schema) {
        //Getting the schema. If not provided will use the defualt schema
        if(!schema || schema === null) schema = this.schemas['DEFAULT'];
        //The key is a required argument. Cannot be gone
        if(!key) throw new TypeError(`Key is a required argument`);
        //You obviously need a value 
        if(!value) throw new TypeError(`Value is a required argument.`);
        schema.findOne({ ID: key}, async(err, data) =>{
            if(!data) {
                let newDate = new schema({
                    ID: key,
                    VALUE: value,
                    AVAILABLE: true,
                    CACHED: options.cached == true ? true : false
                });
                newDate.save();
                return newDate;
            } else if(data){
                data.VALUE = value;
                data.save();
                return data;
            }
        })
    }
    /***
     * Destroys the process. Happens when an error happens
     * 
     */
    async destroy(){
        console.error('Process exit with a status of 404. Error')
        process.exit(404);
       
    }

}

module.exports = MongoDatabase;