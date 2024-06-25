import { database, Event } from "../../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    //Update reading database
    await database.getModel('Customer').create(event.data);
    console.log("Customer created in reading database: " + event.data.id);
}

async function customerUpdatedEvent(event:Event) {
   let customer: any ;

    try {
        customer = await database.getModel('Customer').findOne({ id: event.data.customerId });
    } catch (e) {
        console.log("Something went wrong searching for the customer id: "+e);
    }

    try {
        for(let key of Object.keys(event.data.updates)) {
            console.log('Updating ' + key + ' to ' + event.data.updates[key])
            customer[key] = event.data.updates[key];
        }
    } catch (e) {
        console.log("Something went wrong getting the object keyss" + e);
    }

    await customer.save();

    console.log('Updated ' + customer.name);
}

export {
    customerCreatedEvent,
    customerUpdatedEvent
}