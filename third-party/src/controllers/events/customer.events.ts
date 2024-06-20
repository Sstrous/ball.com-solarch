import { Customer, Event, database } from "../../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    console.log("Connection called: " + event.data);

    //Order database only keeps track of customer email
    let customer:Customer = {
        id: event.data.id,
        name: event.data.name,
        company: event.data.company,
        phone: event.data.phone,
        address: event.data.address
    }

    await database.getModel('Customer').create(customer);
    console.log("Customer created in third-party database: " + event.data.id);
}

async function customerUpdatedEvent(event:Event) {
    let customer = await database.getModel('Customer').findOne({id: event.data.id}) 
     if (!customer) {
         console.log("Customer not found in third-party database: " + event.data.id);
         return;
     }

        customer.id = event.data.id ?? customer.id;
        customer.name = event.data.name ?? customer.name;
        customer.company = event.data.company ?? customer.company;
        customer.phone = event.data.phone ?? customer.phone;
        customer.address = event.data.address ?? customer.address;

     await customer.save();
     console.log('Updated from third-party ' + customer.id);
 }


export {
    customerCreatedEvent,
    customerUpdatedEvent
}