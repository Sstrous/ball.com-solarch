import { amqp, customerRoutes, orderRoutes, productRoutes } from '../../../libs/ball-com/export';
import { orderCreatedEvent, customerCreatedEvent, productAdded } from "../controllers/event.controller";


async function addListeners() {
    
    //Calls from other projects
    await amqp.addExchangeListener(customerRoutes.create, customerCreatedEvent);
    await amqp.addExchangeListener(productRoutes.add, productAdded);
    
    // Update read database
    await amqp.addExchangeListener(orderRoutes.create, orderCreatedEvent);
    
}

export {
    addListeners
}