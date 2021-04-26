import {
  KeyType,
  OptionBoolean,
  TNumber,
} from "../../enums/NumberBooleanStringObject";
import defaultModel from "../../models/defaultModel";

export interface SetOptions {
  /**
   * Whether or not to cache the data after its set
   * defaults to true if MongoClient#options#cache is set to true
   */
  cache?: OptionBoolean;
  /**
   * Typeof model to use, Must have a Key,Value and exists property on the Schema
   * defaults to defaultModel
   */
  model?: typeof defaultModel;
  /**
   * The timeout in ms to wait before deleting the value
   * defaults to null
   */
  deleteAfter?: TNumber;
  /**
   * Whether or not to try and find an already existing key without checking cache first
   * defaults to false
   *
   */
  force?: OptionBoolean;
  /**
   * Whether or not to send the raw data
   * defaults to false
   */
  raw?: OptionBoolean;
}
export interface GetOptions { }

export interface FetchOptions {
  /**
   * Whether or not to cache the data after its set
   * defaults to true if MongoClient#options#cache is set to true
   */
  cache?: boolean;
  /**
   * Typeof model to use, Must have a Key,Value and exists property on the Schema
   * defaults to defaultModel
   */
  model?: typeof defaultModel;
  /**
   * The timeout in ms to wait before deleting the value
   * defaults to null
   */
  deleteAfter?: number;
  /**
   * Whether or not to try and find an already existing key without checking cache first
   * defaults to false
   *
   */
  force?: boolean;
  /**
   * Whether or not to send the raw data
   * defaults to false
   */
  raw?: boolean;
  /**
   * Options for a wider search
   * defaults to undefined
   */
  list?: FetchListOptions;
}
export interface DeleteOptions { }
export interface Raw<K, V> {
  key: K;
  value: V;
  exists: OptionBoolean;
}
export interface FetchListOptions {
  /**
   * Pattern or string to match the key with.
   *This will filter out Keys that are not a type string
   */
  search?: RegExp | string;
  /**
   * Filter out values that don't match the type and only search through there,
   * There is no default
   */
  valType?: KeyType;
  /**
   * Filter out keys that don't match the type and only search through there,
   * There is no default
   */
  keyType?: KeyType
  /**
   * Whether or not to show an array of the found results
   * defaults to false
   */
  all?: OptionBoolean;
}
