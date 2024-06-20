import { amqp, customerRoutes, orderRoutes, productRoutes } from '../../../libs/ball-com/export';
import * as eventController from "../controllers/event.controller";

async function addListeners() {
    
    //Calls from customer project
    await amqp.addExchangeListener(customerRoutes.created, eventController.customerEvents.customerCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.updated, eventController.customerEvents.customerUpdatedEvent);

    //calls from warehouse project
    await amqp.addExchangeListener(productRoutes.add, eventController.productEvents.productAdded);
    await amqp.addExchangeListener(productRoutes.update, eventController.productEvents.productUpdated);
    
    // Update read database
    await amqp.addExchangeListener(orderRoutes.create, eventController.orderEvents.orderCreatedEvent);
    
}

export {
    addListeners
}