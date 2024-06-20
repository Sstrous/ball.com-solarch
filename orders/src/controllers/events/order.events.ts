import { database, Event } from "../../../../libs/ball-com/export";

async function orderCreatedEvent(event: Event) {
    //Update product database
    for (let product of event.data.productList) {
        let dbProduct = await database.getModel('Product').findOne({id: product.id});
        dbProduct.quantity -= product.quantity;
        dbProduct.save();
    }
    
    //Update read database on event
    await database.getModel('Order').create(event.data);
    console.log("Order created in reading database: " + event.data.id);
}

export {
    orderCreatedEvent,
}