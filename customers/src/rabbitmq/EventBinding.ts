import { amqp } from '../../../libs/ball-com/export';
import { orderCreatedEvent, rabbitMQConnectionTest } from "../controllers/event.controller";


async function addListeners() {
    
    //Calls from other projects
    await amqp.addExchangeListener('orders.created', orderCreatedEvent);

    //Update read database
    await amqp.addExchangeListener('customers.created', rabbitMQConnectionTest);
}

export {
    addListeners
}