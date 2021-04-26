import MongoClient  from "./classes/MongoClient";
import ArrayClass from "./classes/Array";
import Logger from "./classes/Logger";
import MongoClientUtil from "./classes/MongoClient";
export { TNumber, OptionBoolean, KeyType } from "./enums/NumberBooleanStringObject";
import { Errors} from "./enums/Errors";
import { TNumberSpace } from "./interfaces/namespaces/Tnumber";
import { valer } from "./interfaces/namespaces/valer";
import defaultModel from "./models/defaultModel";
export { ClientOptions } from "./interfaces/Typings/ClientOptions";
export { SetOptions, FetchOptions, FetchListOptions, Raw} from "./interfaces/Typings/DbOptions";
import Emitter from "./interfaces/Typings/EventEmitter";
export { Events } from "./interfaces/Typings/EventEmitter"
export { MongoOptions } from "./interfaces/Typings/MongoOptions";

export default {
    MongoClient,
    MongoClientUtil,
    ArrayClass,
    Logger,
    TNumberSpace,
    valer,
    Errors,
    defaultModel,
    Emitter,
}