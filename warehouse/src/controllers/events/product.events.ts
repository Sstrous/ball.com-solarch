import { database, Event, Product } from "../../../../libs/ball-com/export";

async function productAddedEvent(event:Event) {
    //Update reading database
    let product:Product = {
        id: event.data.id,
        quantity: event.data.quantity,
    }
    await database.getModel('Product').create(product);
    console.log("Product added in warehouse database: " + event.data.id);
}

async function productUpdatedEvent(event:Event) {
    let product = await database.getModel('Product').findOne({id: event.data.id})
    if (!product) {
        console.log("Product not found in reading database: " + event.data.id);
        return;
    }
    product.quantity = event.data.quantity ?? product.quantity;
    
    await product.save();
    console.log('Updated ' + product.id);
}

export {
    productAddedEvent,
    productUpdatedEvent
}