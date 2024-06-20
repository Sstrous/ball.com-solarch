import { database, Event } from "../../../../libs/ball-com/export";

async function productAddedEvent(event:Event) {
    //Update reading database
    await database.getModel('Product').create(event.data);
    console.log("Product added in reading database: " + event.data.id);
}

async function productUpdatedEvent(event:Event) {
    let product = await database.getModel('Product').findOne({id: event.data.id})
    if (!product) {
        console.log("Product not found in reading database: " + event.data.id);
        return;
    }

    product.name = event.data.name ?? product.name;
    product.quantity = event.data.quantity ?? product.quantity;
    product.price = event.data.price ?? product.price;
    product.description = event.data.description ?? product.description;
    product.sellerId = event.data.sellerId ?? product.sellerId;
    
    await product.save();
    console.log('Updated from third-party ' + product.id);
}

export {
    productAddedEvent,
    productUpdatedEvent
}