import { amqp, customerRoutes, orderRoutes } from '../../../libs/ball-com/export';
import * as eventController from '../controllers/event.controller';


async function addListeners() {
    
    //Calls from orders project
    await amqp.addExchangeListener(orderRoutes.create, eventController.orderCreatedEvent);
    await amqp.addExchangeListener(orderRoutes.update, eventController.orderUpdatedEvent);


    //Update read database
    await amqp.addExchangeListener(customerRoutes.create, eventController.customerCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.update, eventController.customerUpdatedEvent);
}

export {
    addListeners
}