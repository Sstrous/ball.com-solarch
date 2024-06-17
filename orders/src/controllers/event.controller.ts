import { Customer, database, Event } from "../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    console.log("Connection called: " + event.data);


    //Order database only keeps track of customer email
    let customer:Customer = {
        email: event.data.email,
    }

    await database.getModel('Customer').create(customer);
    console.log("Customer created in order database: " + event.data.email);
}


async function orderCreatedEvent(event: Event) {
    //Update read database on event
    await database.getModel('Order').create(event.data);
    console.log("Order created in reading database: " + event.data.id);
}


export { customerCreatedEvent, orderCreatedEvent };