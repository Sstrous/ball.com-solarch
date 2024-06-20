import { amqp, productRoutes, orderRoutes, customerRoutes, warehouseRoutes } from '../../../libs/ball-com/export';
import * as eventController from '../controllers/event.controller';


async function addListeners() {
    
     //Calls from customer project
    await amqp.addExchangeListener(customerRoutes.created, eventController.customerEvents.customerCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.updated, eventController.customerEvents.customerUpdatedEvent);

    //Calls from warehouse project
    await amqp.addExchangeListener(warehouseRoutes.add, eventController.warehouseEvents.warehouseAddedEvent);
    await amqp.addExchangeListener(warehouseRoutes.update, eventController.warehouseEvents.warehouseUpdatedEvent);


   //Update read database
    await amqp.addExchangeListener(productRoutes.add, eventController.productEvents.productAddedEvent);
    await amqp.addExchangeListener(productRoutes.update, eventController.productEvents.productUpdatedEvent);

}

export {
    addListeners
}