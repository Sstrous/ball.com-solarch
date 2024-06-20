import { Event, Warehouse, database } from '../../../../libs/ball-com/export';

async function warehouseAddedEvent(event:Event) {
    //Add warehouse so suppliers can send products to the warehouse
    let warehouse:Warehouse = {
        id: event.data.id,
        address: event.data.address
    }
    await database.getModel('Warehouse').create(warehouse);
}

async function warehouseUpdatedEvent(event:Event) {
    let warehouse = await database.getModel('Warehouse').findOne({id: event.data.id})
    warehouse.address = event.data.address ?? warehouse.address;
    
    warehouse.save();
}

export {
    warehouseAddedEvent,
    warehouseUpdatedEvent
}