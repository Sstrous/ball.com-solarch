import { amqp, customerRoutes, orderRoutes } from '../../../libs/ball-com/export';
import {customerCreatedEvent, customerUpdatedEvent} from "../controllers/events/customer.events";


async function addListeners() {

    //Update read database
    await amqp.addExchangeListener(customerRoutes.created, customerCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.updated, customerUpdatedEvent);
}

export {
    addListeners
}