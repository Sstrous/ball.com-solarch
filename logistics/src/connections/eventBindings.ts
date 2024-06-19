import { amqp, logisticRoutes, invoiceRoutes, customerRoutes } from '../../../libs/ball-com/export';
import * as eventController from '../controllers/event.controller';


async function addListeners() {
    
    //Calls from finance project
    await amqp.addExchangeListener(invoiceRoutes.created, eventController.invoiceEvents.invoiceCreatedEvent);
    await amqp.addExchangeListener(invoiceRoutes.updated, eventController.invoiceEvents.invoiceUpdatedEvent);

    //Calls from customer project
    await amqp.addExchangeListener(customerRoutes.created, eventController.customerEvents.customerCreatedEvent);
    await amqp.addExchangeListener(customerRoutes.updated, eventController.customerEvents.customerUpdatedEvent);
    
    //Update read database
    await amqp.addExchangeListener(logisticRoutes.add, eventController.logisticsEvents.logisticAddedEvent);
    await amqp.addExchangeListener(logisticRoutes.update, eventController.logisticsEvents.logisticUpdatedEvent);

}

export {
    addListeners
}