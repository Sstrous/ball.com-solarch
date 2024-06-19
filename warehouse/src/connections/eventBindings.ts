import { amqp, productRoutes, orderRoutes } from '../../../libs/ball-com/export';
import * as eventController from '../controllers/event.controller';


async function addListeners() {
    
     //Calls from order project
    await amqp.addExchangeListener(orderRoutes.create, eventController.orderEvents.orderCreatedEvent);

   //Update read database
    await amqp.addExchangeListener(productRoutes.add, eventController.warehouseEvents.warehouseAddedEvent);
    await amqp.addExchangeListener(productRoutes.update, eventController.warehouseEvents.warehouseUpdatedEvent);

}

export {
    addListeners
}