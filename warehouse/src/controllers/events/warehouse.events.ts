import { Event, database } from '../../../../libs/ball-com/export';

async function warehouseAddedEvent(event:Event) {
    await database.getModel('Warehouse').create(event.data);
    console.log("Warehouse added in warehouse database: " + event.data.id);
}

async function warehouseUpdatedEvent(event:Event) {
    let warehouse = await database.getModel('Warehouse').findOne({id: event.data.id})
    if (!warehouse) {
        console.log("Warehouse not found in reading database: " + event.data.id);
        return;
    }

    warehouse.name = event.data.name ?? warehouse.name;
    warehouse.address = event.data.address ?? warehouse.address;

    warehouse.save();
}

export {
    warehouseAddedEvent,
    warehouseUpdatedEvent
}