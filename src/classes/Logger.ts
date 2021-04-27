import MongoClient from "./MongoClient";
type Method = 'GET' | 'SET' | 'FETCH' | 'DELETE' | 'PUSH' | 'FETCH_ALL' | 'CONNECTION_CREATE' | 'SEARCH' |  'CONNECTION_FOUND' | 'CONNECTION_FAILED'
export default class Logger<T extends MongoClient>  {
   client: MongoClient
    constructor(client: T) {
        this.client = client;
    }

    log(event: Method,message?: any, ...args: any[]){
        return console.log(`\nMongoClient(${event}): ${new Date(Date.now()).toISOString()} at Connection: ${this.client.options.mongouri}\n- `, message, ...args);

    }
}

