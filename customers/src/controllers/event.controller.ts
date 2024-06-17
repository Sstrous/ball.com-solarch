import { Order, database, Event } from "../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    //Update reading database
    console.log(event.data)
    await database.getModel('Customer').create(event.data);
    console.log("Customer created in reading database: " + event.data.email);
}

async function orderCreatedEvent(event: Event) {
    //Create order in database
    let order:Order = {
        id: event.data.id,
        customerEmail: event.data.customerEmail,
        paid: false
    }

    await database.getModel('Order').create(order);
    console.log("Order created in customer database: " + event.data.id);
}



export {
    customerCreatedEvent,
    orderCreatedEvent
}