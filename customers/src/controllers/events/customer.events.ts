import { database, Event } from "../../../../libs/ball-com/export";

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

export {
    customerCreatedEvent,
    customerUpdatedEvent
}