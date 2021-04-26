import EventEmitter from "events";
import { Connection } from "mongoose"

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
