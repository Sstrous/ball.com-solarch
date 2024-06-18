import { Order, database, Event, productRoutes, amqp } from "../../../libs/ball-com/export";

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
    product.sellerEmail = event.data.sellerEmail ?? product.sellerEmail;
    

    await product.save();
    console.log('Updated ' + product.id);
}

async function orderCreatedEvent(event: Event) {
    //Update product database
    let order:Order = {
        productList: event.data.productList,
        customerEmail: event.data.customerEmail,
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
            database.storeEvent(productRoutes.update, product);
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
    productAddedEvent,
    productUpdatedEvent,
    orderCreatedEvent
}