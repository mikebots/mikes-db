import { OptionBoolean } from "../../enums/NumberBooleanStringObject";
import defaultModel from "../../models/defaultModel";
import { MongoOptions } from "./MongoOptions";
/**
 * The ClientOptions to set
 */
export interface ClientOptions {
  /**
   * The Mongo Uri to Connect to
   */
  mongouri: string;
  /**
   * Whether or not to log events to the console
   */
  log?: OptionBoolean
  /**
       Options for connecting
       */
  mongo: MongoOptions;
  /**
   * Wether or not to cache fetched and set data
   */
  cache?: OptionBoolean

  /**
   * Maximum cache size
   */
  cacheSize?: number;
  /**
   * The Model to use. Must have a Key,Value and exists property on the Schema
   */
  model?: typeof defaultModel;
  /**
   * Whether or not to cache the total cacheSize on startup. Must have the cacheSize? option set
   */
  cacheOnStartUp?: OptionBoolean
}
