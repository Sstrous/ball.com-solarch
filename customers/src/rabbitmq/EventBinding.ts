import { amqp } from '../../../libs/ball-com/export';
import { rabbitMQConnectionTest } from "../controllers/customer.controller";


async function addListeners() {
    // Event store
    const prefix = 'customers.';
    await amqp.addExchangeListener('orders.created', rabbitMQConnectionTest);
}

export {
    addListeners
}