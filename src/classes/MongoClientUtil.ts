import { ClientOptions } from "../interfaces/Typings/ClientOptions";

import defaultModel from "../models/defaultModel";
class BaseMongoClient {
  options: ClientOptions;
  
  constructor(options: ClientOptions) {
    
    this.options = options;
  }

  _validateOpts() {
    let opts = this.options;
    let options: ClientOptions = { mongouri: opts.mongouri, mongo: opts.mongo };

    if (typeof opts.mongouri !== "string")
      throw new TypeError(
        `Option 'mongouri' is missing from ClientOptions or is not a string`
      );
    if (typeof opts.mongo !== "object")
      throw new TypeError(
        `Atleast 1 option in 'MongoClient.options.mongo' has to be present`
      );
      
    const {
      cacheOnStartUp = false,
      cacheSize = 100,
      cache = true,
      model = defaultModel,
      log = false
    } = opts;
    options.model = model;
    const {
      useNewUrlParser = false,
      useUnifiedTopology = false,
      useCreateIndex = false,
      useFindAndModify = true,
      poolSize = 5,
      socketTimeoutMS = 30e3,
    } = opts.mongo;
    if (cache) {
      options.cache = cache
      options.cacheSize = cacheSize;
      options.cacheOnStartUp = cacheOnStartUp;
      options.log = log
    }

    options.mongo = {
      useCreateIndex,
      useFindAndModify,
      useNewUrlParser,
      useUnifiedTopology,
      poolSize,
      socketTimeoutMS,
    };

    return options;
  }
  
}

export default BaseMongoClient;
