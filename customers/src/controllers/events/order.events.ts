import { Order, Event, database } from "../../../../libs/ball-com/export";

async function orderCreatedEvent(event: Event) {
    //Create order in database
    let order:Order = {
        id: event.data.id,
        customerName: event.data.customerName,
    }

    await database.getModel('Order').create(order);
    console.log("Order created in customer database: " + event.data.id);
}

async function orderUpdatedEvent(event: Event) {
    let order = await database.getModel('Order').findOne({id: event.data.id})
    if (!order) {
        console.log("Order not found in reading database: " + event.data.id);
        return;
    }

        order.id = event.data.id ?? order.id;
        order.customerEmail = event.data.customerEmail ?? order.customerEmail;
        order.paid = event.data.paid ?? order.paid;

    await order.save();
    console.log('Updated ' + order.id);
}

export {
    orderCreatedEvent,
    orderUpdatedEvent
}