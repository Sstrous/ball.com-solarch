import { amqp, customerRoutes, orderRoutes, productRoutes } from '../../../libs/ball-com/export';
import * as eventController from "../controllers/event.controller";


async function addListeners() {
    
    //Calls from customer project
    await amqp.addExchangeListener(customerRoutes.create, eventController.customerCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.update, eventController.customerUpdatedEvent);

    //calls from warehouse project
    await amqp.addExchangeListener(productRoutes.add, eventController.productAdded);
    await amqp.addExchangeListener(productRoutes.update, eventController.productUpdated);
    
    // Update read database
    await amqp.addExchangeListener(orderRoutes.create, eventController.orderCreatedEvent);
    
}

export {
    addListeners
}