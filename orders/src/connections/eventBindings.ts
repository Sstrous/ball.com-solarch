import { amqp, customerRoutes, orderRoutes } from '../../../libs/ball-com/export';
import { orderCreatedEvent, customerCreatedEvent } from "../controllers/event.controller";


async function addListeners() {
    
    //Calls from other projects
    await amqp.addExchangeListener(customerRoutes.create, customerCreatedEvent);
    
    // Update read database
    await amqp.addExchangeListener(orderRoutes.create, orderCreatedEvent);
    
}

export {
    addListeners
}