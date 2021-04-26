import BaseMongoClient from "./MongoClientUtil";
import { ClientOptions } from "../interfaces/Typings/ClientOptions";
import {
  SetOptions,
  
  FetchOptions,
  Raw,
} from "../interfaces/Typings/DbOptions";

import { Errors } from "../enums/Errors";
import { valer } from "../interfaces/namespaces/valer";
import Emitter from "../interfaces/Typings/EventEmitter";
import { TNumberSpace } from "../interfaces/namespaces/Tnumber";
import ArrayClass from "./Array";
import { DefaultModelInterface } from "../models/defaultModel";
import Logger from "./Logger";
import { Connection } from "mongoose";

type con<T> = { -readonly [P in keyof T]: T[P] };
/**
 * Mongo Client Class
 */
class MongoClient extends BaseMongoClient {
  options: ClientOptions;
  cache?: Map<any, any> | undefined;
  private _array: ArrayClass<any>;
  private mongodb: typeof import("mongoose");
  logger?: Logger<this>;
  connection: con<Connection> | null;
  db: Emitter;

  /**
   *
   * @param {ClientOptions} opts - Options used for configuration
   * @example
   * //Importing MongoClient
   * import { MongoClient } from 'mikes-db';
   * //Using Require
   * const { MongoClient } = require('mikes-db');
   *
   * //initiating the client
   * const client = new MongoClient({
   *      mongouri: 'mongodb://localhost/test' ,//mongo uri
   *      mongo: {
   *         useUnifiedTopology: true
   *      },
   *      log: true, //Log events
   *      cache: true, //cacheing
   *      cacheOnStartUp: true, //cache values on startup
   *      cacheSize: 100 //Maximum cache size limit
   * })
   */
  constructor(opts: ClientOptions) {
    super(opts);
    this.options = super._validateOpts();
    this.connection = null;
    this.mongodb = require("mongoose");
    this._array = new ArrayClass();
    this.logger = new Logger(this);
    this.db = new Emitter();
  }
  public async connect(): Promise<void> {
    try {
      this.db.emit("CONNECTION_FOUND", this.options.mongouri);
      this.connection = (
        await this.mongodb.connect(this.options.mongouri, this.options.mongo)
      ).connections[0];

      if (this.options.cache) {
        this.cache = new Map();

        if (
          this.options.cacheOnStartUp &&
          this.options.cacheSize &&
          this.options.cacheSize > 0
        ) {
          let vals = (await this.options.model?.find({ exists: true })) || [];
          if (vals.length) {
            vals =
              vals.length > this.options.cacheSize
                ? vals.slice(0, this.options.cacheSize)
                : vals;
            let cache = this.cache;
            vals.forEach((val) =>
              cache.set(val.Key, {
                value: val.Value,
                key: val.Key,
                exists: true,
              })
            );
            this.cache = cache;
          }
        }
      }
      this.db.emit(
        "CONNECTION_CREATE",
        {
          host: this.connection.host,
          port: this.connection.port,
          pass: this.connection.pass,
          name: this.connection.name,
          user: this.connection.user,
        },
        this.options?.mongouri
      );
    } catch (error) {
      this.connection = null;
      throw error;
    }
  }
  /**
   * Checks if the database connection is still intact
   * @private
   */
  private _connected(): boolean {
    return this.connection !== null;
  }

  /**
   * Sets a Key with Value: value in the model
   * @param {K} key - The  Key to set the value to
   * @param value - The value to set
   * @param {SetOptions?} options - the option to set
   * @returns {V} - The now set value
   * @example
   * MongoClient.set('foo', ['bar']).then(data=>console.log(data[0])) //output: 'bar'
   */
  public async set<K, V>(key: K, value: V, options?: SetOptions): Promise<V> {
    if (!this._connected()) throw new Error(Errors.NO_CONNECTION);

    if (key == undefined || value == undefined)
      return Promise.reject(Errors.UNDEFINED_SET_KEY);

    let model = options?.model || this.options.model;
    if (model) {
      let val =
        options?.force && this.cache
          ? await valer.searchKey(key, model, true, {}, true)
          : this.cache?.get(key) ||
            (await valer.searchKey(key, model, true, {}, true));
      if (!val) {
        let thing = valer.create(model, { key, value });
        thing = await thing.save();
        let h: V = thing.Value;
        console.log(h);
        if (this.options.cache && Boolean(options?.cache) !== false)
          if(this.cache && this.options?.cacheSize && this.cache?.size < this.options?.cacheSize && Boolean(options?.cache) !== false) {

           if(this.cache?.size < this.options.cacheSize) this.cache?.set(thing.Key, {
            key: thing.Key,
            value: thing.Value,
            exists: true,
          });
          else {
              let arr : any[] = [];
              this.cache.forEach(c=>arr.push(c));
              let val = arr.pop();
              this.cache.delete(val.key);
              this.cache.set(thing.Key, {
                key: thing.Key,
                value: thing.Value,
                exists: true,
              });
          }
          
        } 

        else if(this.cache && Boolean(options?.cache) !== false) this.cache.set(thing.Key, {
          key: thing.Key,
          value: thing.Value,
          exists: true,
        });
        if (
          options?.deleteAfter &&
          ["string", "number"].includes(typeof options?.deleteAfter)
        ) {
          setTimeout(async () => {
            await valer.deletekey(thing.Key, model);
          }, TNumberSpace.resolve(options?.deleteAfter));
        }
        if (options?.raw) return thing;
        else return h;
      } else {
        val = await model.findOne({ Key: key });
        val.Value = value;
        let thing = await val.save().catch(Promise.reject);
        let h: V = val.Value;
        console.log(h);
        if (this.options.cache && Boolean(options?.cache) !== false)
          this.cache?.set(val.Key, {
            key: val.Key,
            value: val.Value,
            exists: true,
          });
        if (
          options?.deleteAfter &&
          typeof TNumberSpace.resolve(options?.deleteAfter) == "number"
        ) {
          setTimeout(async () => {
            await valer.deletekey(thing.Key, model);
            this.cache?.delete(key)
          }, TNumberSpace.resolve(options?.deleteAfter));
        }
        this.db.emit('SET', key, options?.raw ? thing : h, true)
        if (options?.raw) return thing;
        else return h;
      }
    } else {
      this.db.emit('SET', key, value, false)
      throw new Error("Could not find a model to search a key with");
    }
  }

  public async fetch<K>(
    key: K,
    options?: FetchOptions
  ): Promise<any | Raw<K, any>> {
    if (!this._connected()) return Promise.reject(Errors.NO_CONNECTION);
    if (["boolean", "undefined"].includes(typeof key))
      return Promise.reject(Errors.BOOLEAN_KEY);
    if (options && typeof options !== "object")
      return Promise.reject(Errors.INVALID_OPTIONS_TYPE);
    let model = options?.model ? options.model : this.options.model;

    if (
      options?.list?.keyType &&
      !["string", "object", "number"].includes(options?.list?.keyType)
    )
      return Promise.reject(Errors.INVALID_KEYTYPE);
    if (options?.list?.search && options.list?.keyType !== "string")
      return Promise.reject(Errors.INVALID_SEARCHTYPE);
    if (model) {
      let val = options?.force
        ? await valer.searchKey(
            key,
            model,
            !options?.list?.all,
            options?.list,
            options?.raw
          )
        : this.cache?.get(key) ||
          (await valer.searchKey(
            key,
            model,
            !options?.list?.all,
            options?.list,
            options?.raw
          ));
      if (options?.cache || (this.cache && options?.cache != false)) {
        if (Array.isArray(val)) {
          val.forEach(async (v) => {
            if (v.value) this.cache?.set(v.key, v);
            else {
              let x = await model?.find();
              if (x) {
                let value =
                  x.find((x) => x.Value == v) ||
                  x.find((x) => x.Value == v.value);
                if (value)
                  this.cache?.set(value.Key, {
                    key: value.Key,
                    value: value.Value,
                    exists: true,
                  });
              }
            }
          });
        } else {
          if (val.value) this.cache?.set(val.key, val);
          else {
            let x = await model?.find();
            if (x) {
              let value = x.find((x) => x.Value == val);
              if (value) this.cache?.set(value.Key, value);
            }
          }
        }
      }
      if (
        options?.deleteAfter &&
        typeof TNumberSpace.resolve(options?.deleteAfter) == "number"
      ) {
        setTimeout(async () => {
          await valer.deletekey(val.key, model);
        }, TNumberSpace.resolve(options?.deleteAfter));
      }
      this.db.emit('FETCH', key, val, true)
      return val;
    } else{
      this.db.emit('FETCH', key, null, false)
      throw new Error(`Could not find a model to search with`);
    } 
  }
  public get<K>(key: K): any {
    if (!this._connected())
      console.warn(
        `Could not find a connection to use. Cache may be inaccurate`
      );
    if (["boolean", "undefined"].includes(typeof key))
      throw new TypeError(Errors.BOOLEAN_KEY);
    let data = this.cache?.get(key);
    if (data){
      this.db.emit('GET', key, data.value, true)
      return data.value;
    }
    else {
      this.db.emit('GET', key, undefined, false)
      return undefined;
    }
  }
  /**
   * Returns an array of all the cached values
   * @param {function} fn The function to fillter out values with
   * @returns
   */
  public getAll<T>(fn?: (thisArg: T) => boolean): any[] {
    let arr: any[] = [];
    this.cache?.forEach(
      (val: {
        key: DefaultModelInterface["Key"];
        value: DefaultModelInterface["Value"];
        exists: DefaultModelInterface["exists"];
      }) => {
        if (val.exists) arr.push(val.value);
      }
    );

    if (fn) return arr.filter(fn);
    return arr;
  }
}

export default MongoClient;
