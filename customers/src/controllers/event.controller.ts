import { database } from "../../../libs/ball-com/export";
import Event from '../../../libs/ball-com/models/Event';

async function rabbitMQConnectionTest(event:Event) {
    console.log("Connection called: " + event.data);
}

async function customerCreatedEvent(event:Event) {
    //Update read database to add customer
    
}

async function orderCreatedEvent(event: Event) {
    //Create order in database
}



export {
    rabbitMQConnectionTest,
    customerCreatedEvent,
    orderCreatedEvent
}