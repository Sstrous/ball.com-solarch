import { amqp, productRoutes, orderRoutes } from '../../../libs/ball-com/export';
import { productAddedEvent, orderCreatedEvent } from '../controllers/event.controller';


async function addListeners() {
    
    //Calls from other projects
    await amqp.addExchangeListener(productRoutes.add, productAddedEvent);
    
    //Update read database
    await amqp.addExchangeListener(orderRoutes.create, orderCreatedEvent);

}

export {
    addListeners
}