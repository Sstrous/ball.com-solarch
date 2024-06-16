import { database } from "../../../libs/ball-com/export";
import Event from '../../../libs/ball-com/models/Event';

async function customerCreatedEvent(event:Event) {
    console.log("Connection called: " + event.data);
    //Create customer for order database

}


async function orderCreatedEvent(event: Event) {
    //Update read database on event
    console.log("Order created event called: " + event.data);
}


export {
    customerCreatedEvent
}