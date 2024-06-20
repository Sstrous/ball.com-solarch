import { amqp, customerRoutes, orderRoutes } from '../../../libs/ball-com/export';
import * as eventController from '../controllers/event.controller';


async function addListeners() {
    
    //Calls from orders project
    await amqp.addExchangeListener(orderRoutes.create, eventController.orderEvents.orderCreatedEvent);
    await amqp.addExchangeListener(orderRoutes.update, eventController.orderEvents.orderUpdatedEvent);

    //Update read database
    await amqp.addExchangeListener(customerRoutes.created, eventController.customerEvents.customerCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.updated, eventController.customerEvents.customerUpdatedEvent);
}

export {
    addListeners
}