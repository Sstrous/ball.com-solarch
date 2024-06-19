import { database, productRoutes, Event, amqp, Order } from "../../../../libs/ball-com/export";

async function orderCreatedEvent(event: Event) {
    //Update product database
    let order:Order = {
        id: event.data.id,
        productList: event.data.productList,
        customerName: event.data.customerName,
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
            console.log("Product out of stock in warehouse database: " + event.data.productId);
            //2 orders at the exact same time could cause this, cancel order where stock goes below 0
            order.cancelled = true;
            product.quantity = 0;

            //Fire a new event that says this item is out of stock so order project knows product is not there anymore
            database.storeEvent(productRoutes.update, product, product.id);
            amqp.publish(productRoutes.update, product);
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
    orderCreatedEvent,
}