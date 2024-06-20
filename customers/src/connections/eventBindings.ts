import { amqp, customerRoutes, orderRoutes } from '../../../libs/ball-com/export';
import { customerCreatedEvent, orderCreatedEvent } from '../controllers/event.controller';


async function addListeners() {
    
    //Calls from other projects
    await amqp.addExchangeListener(orderRoutes.create, orderCreatedEvent);
    //Update read database
    await amqp.addExchangeListener(customerRoutes.created, customerCreatedEvent);
}

export {
    addListeners
}