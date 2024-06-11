import * as amqp from "./amqp";
import { rabbitMQConnectionTest } from "../controllers/customer.controller";


async function addListeners() {
    // Event store
    const prefix = 'customers.';
    await amqp.addExchangeListener('order.created', rabbitMQConnectionTest);
}

export {
    addListeners
}