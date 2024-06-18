import { amqp, logisticRoutes, invoiceRoutes } from '../../../libs/ball-com/export';
import * as eventController from '../controllers/event.controller';


async function addListeners() {
    
    //Calls from finance project
    await amqp.addExchangeListener(invoiceRoutes.created, eventController.invoiceCreatedEvent);
    await amqp.addExchangeListener(invoiceRoutes.updated, eventController.invoiceUpdatedEvent);
    
    //Update read database
    await amqp.addExchangeListener(logisticRoutes.add, eventController.logisticAddedEvent);
    await amqp.addExchangeListener(logisticRoutes.update, eventController.logisticUpdatedEvent);

}

export {
    addListeners
}