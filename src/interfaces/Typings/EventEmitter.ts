import EventEmitter from "events";
import { Connection } from "mongoose"
import { OptionBoolean } from "../../enums/NumberBooleanStringObject";

export interface Events {
    'CONNECTION_FOUND': (uri: string) => void;
    'CONNECTION_CREATE': (
        connection: {
            host: Connection['host'],
            port: Connection['port'],
            pass: Connection['pass'],
            name: Connection['name'],
            user: Connection['user'],


        },
        uri: string
    ) => void;
    'SET': (key: any, value: any, successfull: OptionBoolean) => void;
    'FETCH': (key: any, value: any, successfull: OptionBoolean) => void;
    'GET': (key: any, value: any, successfull: OptionBoolean) => void;
}
declare interface Emitter {
    on<U extends keyof Events>(
        event: U, listener: Events[U]
    ): this;
    emit<U extends keyof Events>(
        event: U, ...args: Parameters<Events[U]>
    ) : boolean;
}
class Emitter extends EventEmitter {
    constructor(){
        super()
    }
};
export default Emitter;
