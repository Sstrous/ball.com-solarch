import { Customer, Event, database } from "../../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    //Update reading database
    let customer:Customer = {
        id: event.data.id,
        name: event.data.name,
        address: event.data.address,
    }
    await database.getModel('Customer').create(customer);
    console.log("Customer created in reading database: " + event.data.id);
}

async function customerUpdatedEvent(event:Event) {
   let customer = await database.getModel('Customer').findOne({id: event.data.id}) 
    if (!customer) {
        console.log("Customer not found in reading database: " + event.data.id);
        return;
    }

    customer.name = event.data.name ?? customer.name;
    customer.address = event.data.address ?? customer.address;

    await customer.save();
    console.log('Updated ' + customer.id);
}

export {
    customerCreatedEvent,
    customerUpdatedEvent
}