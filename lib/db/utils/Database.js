const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');
const DataType = require('./Structures.js');
const fs = require('fs')

class Database {
    constructor(datas){
        this.data = datas;
        this.data.cache = new Map();
    }/**
     * hi
     * @param {string} key 
     */
    async getCache(key){
        const schema = this.data.schemas['DEFAULT'];
         return new Promise(async(resolve, reject) =>{
            if((await schema.findOne({ ID: key})).cached == true && (await schema.findOne({ ID: key})).AVAILABLE == true){
                const Data = await schema.findOne({ ID: key});
                if(Data){
                    resolve(Data.VALUE && Data);
                    return true;
                } else if(!Data){
                    reject(`Unfound Data no cache`);
                } else if(!Data.AVAILABLE){
                    
                    try{
                        await this.fetch(key, schema).then(e=>resolve(e));
                    }catch(err){
                    reject(`Unavailable data try fetching instead!`);
                    return this.data.error = { msg: 'Unavailable Data'}
                    }
                }
            }
        })
    }
    async getCached(){
       
        const DATAS = [];
        const schema = this.data.schemas['DEFAULT'];
        const mappedCacheData = this.data.cache.forEach(d => {
            DATAS.push({
                KEY: d.ID,
                VALUE: d.VALUE
            })
        });
        return DATAS;

    }
    async fetch(key, schema) {
        if(!schema) schema = this.data.schemas['DEFAULT'];
        return new Promise(async(resolve, reject) =>{
            await schema.findOne({ ID: key}, async(err, Data)=>{
            if(err) {
                reject(err);
                throw err;
            }
            if(Data){
                
                
                Data.AVAILABLE = true;
                Data.CACHED = true;
                Data.save();
                this.data.cache.set(Data.ID, Data)
                resolve(Data.VALUE);
            
            } else if(!Data){
                reject(new TypeError(`UNFOUND DATA ERROR`))
                throw new TypeError(`Invalid key.`);
            } 
        });
        })
    }
    async clearCache(schema){
        if(!schema) schema = this.data.schemas['DEFAULT'];

        const Datas = await schema.find({ CACHED: true, AVAILABLE: true});
        Datas.forEach(async(Data)=>{
            this.data.cache.delete(Data.ID);
            await schema.deleteOne({ ID: Data.ID}, async(err) =>{
                if(err){
                    return console.error(err)
                } else;
            });


        })
    }
    /**
     * @param {string} name - Schema name
     * @returns {Schema}
     */
    async addSchema(name){
        if(!name) throw new TypeError('Name is a required argument');
        else if(name){
            model(name, new Schema({
                ID: mongoose.SchemaTypes.Mixed,
                VALUE: mongoose.SchemaTypes.Mixed,
                CACHED: Boolean,
                AVAILABLE: Boolean
            }));
            
        }
        
    }
    async set(key, value, schema) {
        if(!schema || schema === null) schema = this.data.schemas['DEFAULT'];
        if(!key) throw new TypeError(`Key is a required argument`);
        if(!value) throw new TypeError(`Value is a required argument.`);
        return new Promise(async(resolve, reject) => {
            schema.findOne({ ID: key}, async(err, data) =>{
                if(err){
                    reject(err);
                    throw err;
                }
                else if(!data) {
                    let newDate = new schema({
                        ID: key,
                        VALUE: value,
                        AVAILABLE: true,
                        CACHED: true
                    });
                    
                    newDate.save();
                    this.data.cache.set(newDate.ID, newData)
                    resolve(newDate.VALUE);
                    return newDate;
                } else if(data){
                    data.VALUE = value;
                    data.save();
                    this.data.cache.set(data.ID, data)
                    resolve(data.VALUE);
                    fs.appendFile(`db-logs.log`, `
                    module.exports = {
                        ${key} : ${value}
                    }
                    `).catch(console.error)
                    return data;
                }
            })
        })
    }
    async get(key){
        if(!key) throw new TypeError(`Error: No key provided.`);
        const DATAS = { }
        if(key){
            console.log(this.data)
           return new Promise(async(resolve, reject) => {
            if(this.data.cache.has(key)){
                DATAS.VALUE = this.data.cache.get(key).VALUE;
                resolve(DATAS.VALUE)
            } else if(!this.data.cache.has(key)){
                DATAS.VALUE = undefined;
                resolve(DATAS.VALUE)
            }
           })
        }
        
    }
}
module.exports = Database;