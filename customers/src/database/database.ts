import config from "../config/config.json";
import {Connection, default as mongoose} from "mongoose";
import CustomerSchema from "../models/schemas/CustomerSchema";
import {EventSchema} from "../models/schemas/EventSchema";

let readConnection: Connection;
let writeConnection: Connection;

async function connect(callback: () => void) {
    mongoose.Promise = global.Promise;
    // mongoose.set('useCreateIndex', true);
    readConnection = mongoose.createConnection(config.mongodb.read);
    writeConnection = mongoose.createConnection(config.mongodb.write);

    readConnection.model('Customer', CustomerSchema);

    writeConnection.model('Event', EventSchema);
}

function getReadConnection() {
    return readConnection;
}

function getWriteConnection() {
    return writeConnection;
}

async function storeEvent(type: string, data: any, email: string) {
    let json = JSON.stringify(data);

    let event = await writeConnection.model('Event').create({
        timestamp: +new Date(),
        type,
        data: json,
        email
    });
}

export {
    connect,
    getReadConnection,
    getWriteConnection,
    storeEvent
}