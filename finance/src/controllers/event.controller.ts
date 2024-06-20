import { database, Event, Invoice, PaymentTypes, Product } from '../../../libs/ball-com/export';

async function invoiceCreatedEvent(event: Event) {
    
    await database.getModel('Invoice').create(event.data);
    console.log("Invoice created in reading database: " + event.data.invoiceId);
}

async function invoiceUpdatedEvent(event: Event) {

    await database.getModel('Invoice').findOneAndUpdate(event.data.invoiceId, event.data);

    console.log('Invoice deleted in ')
}

async function invoiceDeletedEvent(event: Event) {
    
    await database.getModel('Invoice').findOneAndDelete(event.data.invoiceId)

    console.log('Invoice deleted')
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

// With a new Order, an Invoice should be created
async function orderCreatedEvent(event: Event) {

    // calculate total price of order
    let totalPrice = 0;
    event.data.productList.forEach((product: Product) => {
        totalPrice += product.price!;
    });

    let invoice: Invoice = {
        customerId: event.data.customerId,
        price: totalPrice,
        orderId: event.data.id,
        PaymentType: PaymentTypes.AfterPay,
        paid: false
    }

    await database.getModel('Invoice').create(invoice);
    console.log("Invoice created in customer database: " + event.data.id);
}

export {
    invoiceCreatedEvent,
    invoiceUpdatedEvent,
    invoiceDeletedEvent,
    customerCreatedEvent,
    orderCreatedEvent
}