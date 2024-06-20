import { Customer, Event, database } from "../../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    console.log("Connection called: " + event.data);

    //Order database only keeps track of customer email
    let customer:Customer = {
        id: event.data.id,
        name: event.data.name,
    }

    await database.getModel('Customer').create(customer);
    console.log("Customer created in order database: " + event.data.id);
}

async function customerUpdatedEvent(event:Event) {
    let customer = await database.getModel('Customer').findOne({id: event.data.id}) 
     if (!customer) {
         console.log("Customer not found in reading database: " + event.data.id);
         return;
     }

        customer.id = event.data.id ?? customer.id;
        customer.name = event.data.name ?? customer.name;

     await customer.save();
     console.log('Updated ' + customer.id);
 }


export {
    customerCreatedEvent,
    customerUpdatedEvent
}