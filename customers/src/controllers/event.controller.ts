import * as customerEvents from './events/customer.events';
import { database, Event } from "../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    //Update reading database
    await database.getModel('Customer').create(event.data);
    console.log("Customer created in reading database: " + event.data.email);
}

export {
    customerEvents
}