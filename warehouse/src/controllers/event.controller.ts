import { Order, database, Event } from "../../../libs/ball-com/export";

async function productAddedEvent(event:Event) {
    //Update reading database
    console.log(event.data)
    await database.getModel('Product').create(event.data);
    console.log("Product added in reading database: " + event.data.id);
}

async function orderCreatedEvent(event: Event) {
    //Update product database
    let order:Order = {
        productList: event.data.productList,
        customerId: event.data.customerId,
        cancelled: false
    }

        //Check if all products are up to date in Warehouse database so its actually available
    for (let product of event.data.productList) {
        let productInDb = await database.getModel('Product').findById(product.productId)
        if (!productInDb) {
            console.log("Product not found in product database: " + product.productId);
            order.cancelled = true;
            return;
        }
        if (productInDb.quantity - product.quantity < 0) {
            console.log("Product out of stock in product database: " + event.data.productId);
            //2 orders at the exact same time could cause this, cancel order where stock goes below 0
            order.cancelled = true;
            return;
        }
        //If this is not the case update quantity in warehouse database
        productInDb.quantity -= product.quantity;
        productInDb.save();
    }

    await database.getModel('Order').create(order);
    console.log("Order created in warehouse database: " + event.data.id);
}



export {
    productAddedEvent,
    orderCreatedEvent
}