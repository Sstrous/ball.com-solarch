import {Customer, Event, database, customerRoutes} from "../../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {

    //Order database only keeps track of customer email
    let customer:Customer = {
        id: event.data.data.id,
        company: event.data.data.company,
        name: event.data.data.name,
        phone: event.data.data.phone,
        address: event.data.data.address,
    }

    try {
        await database.storeEvent('CustomerCreated', event.data.data, event.data.id);
    } catch (e) {
        console.log("Storing the event went wrong.."+e);
    }

    try {
        await database.getModel('Customer').create(customer);
    } catch (e) {
        console.log("Creating the customer went wrong.."+e + JSON.stringify(customer, null, 2));
    }
}

async function customerUpdatedEvent(event:Event) {
    console.log('Updating customer using the Event coming from MS CUstomer!');
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