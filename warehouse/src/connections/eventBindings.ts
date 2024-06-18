import { amqp, productRoutes, orderRoutes } from '../../../libs/ball-com/export';
import * as eventController from '../controllers/event.controller';


async function addListeners() {
    
    //Calls from warehouse project
    await amqp.addExchangeListener(productRoutes.add, eventController.productAddedEvent);
    await amqp.addExchangeListener(productRoutes.update, eventController.productUpdatedEvent);
    
    //Update read database
    await amqp.addExchangeListener(orderRoutes.create, eventController.orderCreatedEvent);

}

export {
    addListeners
}