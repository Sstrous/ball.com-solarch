import { database, Event } from "../../../../libs/ball-com/export";

async function logisticAddedEvent(event:Event) {
    //Update reading database
    await database.getModel('Logistic').create(event.data);
    console.log("logistic added in reading database: " + event.data.id);
}

async function logisticUpdatedEvent(event:Event) {
    let logistic = await database.getModel('Logistic').findOne({id: event.data.id});
    if (!logistic) {
        console.log("logistic not found in reading database: " + event.data.id);
        return;
    }

    logistic.companyName = event.data.name ?? logistic.companyName;
    logistic.address = event.data.address ?? logistic.address;
    logistic.email = event.data.email ?? logistic.email;
    logistic.phone = event.data.phone ?? logistic.phone;

    await logistic.save();
    console.log('Updated ' + logistic.id);
}

export {
    logisticAddedEvent,
    logisticUpdatedEvent
}