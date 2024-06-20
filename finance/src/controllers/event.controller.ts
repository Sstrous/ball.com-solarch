import { database, Order, Event } from '../../../libs/ball-com/export';

async function invoiceCreatedEvent(event: Event) {
    
    await database.getModel('Invoice').create(event.data);
    console.log("Invoice created in reading database: " + event.data.invoiceId);
}

async function invoiceUpdatedEvent(event: Event) {

    await database.getModel('Invoice').findOneAndUpdate(event.data.invoiceId, event.data);

    console.log('Invoice deleted in ')
}

async function customerCreatedEvent(event:Event) {
    //Update reading database
    await database.getModel('Customer').create(event.data);
    console.log("Customer created in database: " + event.data.email);
}

async function customerUpdatedEvent(event: Event) {

    await database.getModel('Customer').findOneAndUpdate(event.data.customerId, event.data)
    
    console.log('Customer updated in customerDB')
}

async function orderCreatedEvent(event: Event) {
    //Create order in database
    let order:Order = {
        id: event.data.id,
        customerId: event.data.customerId,
        cancelled: false,
        productList: event.data.productList
    }

    await database.getModel('Order').create(order);
    console.log("Order created in customer database: " + event.data.id);
}

export {
    invoiceCreatedEvent,
    invoiceUpdatedEvent,
    customerCreatedEvent,
    orderCreatedEvent,
}