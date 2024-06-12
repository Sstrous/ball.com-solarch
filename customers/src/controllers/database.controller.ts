// import config from "../config/config.json";
// import * as mongoose from "mongoose";
// import CustomerSchema from "../models/schemas/CustomerSchema";
// import EventSchema from "../models/schemas/EventSchema";
//
// let readConnection: mongoose.Connection;
// let writeConnection: mongoose.Connection;
//
// async function connect(callback: () => void){
//     readConnection = mongoose.createConnection(config.mongodb.read);
//     writeConnection = mongoose.createConnection(config.mongodb.write);
//     readConnection.model('Customer', CustomerSchema);
//
//     writeConnection.model('Event', EventSchema);
//
//     callback();
// }
//
// function getReadConnection() {
//     return readConnection;
// }
//
// function getWriteConnection() {
//     return writeConnection;
// }
//
// async function storeEvent(type: string, data: any, email: string) {
//     let json = JSON.stringify(data);
//
//     await writeConnection.model('Event').create({
//         timestamp: +new Date(),
//         type,
//         data: json,
//         email
//     });
// }
//
// export {
//     connect,
//     getReadConnection,
//     getWriteConnection,
//     storeEvent
// }