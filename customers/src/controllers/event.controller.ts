import * as customerEvents from './events/customer.events';
import * as orderEvents from './events/order.events';
import {Request, Response} from "express";
import {
    database,
    Customer,
    Order,
    amqp,
    customerRoutes,
} from "../../../libs/ball-com/export";


async function getAllEvents(req: Request, res: Response) {
    let events = await database.getWriteConnection().model('Event').find({}).sort('timestamp').exec();
    res.send(events);
}

async function getAllOrderEvents(req: Request, res: Response) {
    // Order.created Order.updated Order.deleted
    let events = await database.getWriteConnection().model('Event').find({
        type: { $in: ['order.created', 'order.updated', 'order.deleted'] }
    }).sort('timestamp').exec();
    res.send(events);
}

async function getAllCustomerEvents(req: Request, res: Response) {
    // Log the distinct types to verify what exists in the database
    let distinctTypes = await database.getWriteConnection().model('Event').distinct('type').exec();
    console.log('Distinct event types in database:', distinctTypes);

    let events = await database.getWriteConnection().model('Event').find({
        type: { $in: ['customers.created', 'customers.updated', 'customers.deleted'] }
    }).sort('timestamp').exec();

    console.log('Events:', events);
    res.send(events);
}

async function runHistoryEvents(req: Request, res: Response) {
    // Get all events from the database
    let events = await database.getWriteConnection().model('Event').find({}).sort('timestamp').exec();
    // Loop through all events and publish them to the message broker
    events.forEach((event: any) => {
        amqp.publish(event.type, event.payload);
    });
    res.send('All events have been published');
}






export {
    customerEvents,
    orderEvents,
    getAllEvents,
    getAllOrderEvents,
    getAllCustomerEvents
}