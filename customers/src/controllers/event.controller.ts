import { Order, database, Event } from "../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    //Update reading database
    await database.getModel('Customer').create(event.data);
    console.log("Customer created in reading database: " + event.data.email);
}

async function customerUpdatedEvent(event:Event) {
   let customer = await database.getModel('Customer').findOne({id: event.data.id}) 
    if (!customer) {
        console.log("Customer not found in reading database: " + event.data.email);
        return;
    }

    customer.email = event.data.email ?? customer.email;
    customer.name = event.data.name ?? customer.name;
    customer.address = event.data.address ?? customer.address;

    await customer.save();
    console.log('Updated ' + customer.email);
}

async function orderCreatedEvent(event: Event) {
    //Create order in database
    let order:Order = {
        id: event.data.id,
        customerEmail: event.data.customerEmail,
        paid: false,
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
    customerCreatedEvent,
    orderCreatedEvent,
    orderUpdatedEvent,
    customerUpdatedEvent
}