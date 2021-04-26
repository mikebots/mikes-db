
export interface MongoOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
  poolSize?: number;
  socketTimeoutMS?: number;
}
