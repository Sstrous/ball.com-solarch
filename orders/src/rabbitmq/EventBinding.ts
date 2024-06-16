import { amqp } from '../../../libs/ball-com/export';
import { orderCreatedEvent, customerCreatedEvent } from "../controllers/event.controller";


async function addListeners() {
    
    //Calls from other projects
    await amqp.addExchangeListener('customers.created', customerCreatedEvent);
    
    // Update read database
    await amqp.addExchangeListener('orders.created', orderCreatedEvent);
    
}

export {
    addListeners
}