import { Customer, database, Event, Order, Product } from "../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    console.log("Connection called: " + event.data);

    //Order database only keeps track of customer email
    let customer:Customer = {
        email: event.data.email,
    }

    await database.getModel('Customer').create(customer);
    console.log("Customer created in order database: " + event.data.email);
}


async function orderCreatedEvent(event: Event) {
    
    //Update product database
    for (let product of event.data.productList) {
        let dbProduct = await database.getModel('Product').findOne({id: product.id});
        dbProduct.quantity -= product.amount;
        dbProduct.save();
    }
    
    //Update read database on event
    await database.getModel('Order').create(event.data);
    console.log("Order created in reading database: " + event.data.id);
}

async function productAdded(event: Event) {
    //Order only keeps track of id and quantity
    let product:Product = {
        id: event.data.id,
        quantity: event.data.quantity,
    }

    await database.getModel('Product').create(product);
    console.log("Product added in reading database: " + product.id);
}


export { customerCreatedEvent, orderCreatedEvent, productAdded };