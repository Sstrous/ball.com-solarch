import { amqp, customerRoutes, invoiceRoutes, orderRoutes } from '../../../libs/ball-com/export';
import { customerCreatedEvent, invoiceCreatedEvent, orderCreatedEvent, 
         invoiceUpdatedEvent,  invoiceDeletedEvent } from '../controllers/event.controller'

async function addListeners() {

    // others
    await amqp.addExchangeListener(orderRoutes.create, orderCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.created, customerCreatedEvent);

    // self
    await amqp.addExchangeListener(invoiceRoutes.created, invoiceCreatedEvent);
    await amqp.addExchangeListener(invoiceRoutes.updated, invoiceUpdatedEvent);
    await amqp.addExchangeListener(invoiceRoutes.deleted, invoiceDeletedEvent);

}

export {
    addListeners
};