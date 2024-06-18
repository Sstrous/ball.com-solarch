import { Customer, database, Event, Product } from "../../../libs/ball-com/export";

async function customerCreatedEvent(event:Event) {
    console.log("Connection called: " + event.data);

    //Order database only keeps track of customer email
    let customer:Customer = {
        id: event.data.id,
        email: event.data.email,
    }

    await database.getModel('Customer').create(customer);
    console.log("Customer created in order database: " + event.data.email);
}

async function customerUpdatedEvent(event:Event) {
    let customer = await database.getModel('Customer').findOne({email: event.data.email}) 
     if (!customer) {
         console.log("Customer not found in reading database: " + event.data.email);
         return;
     }

        customer.email = event.data.email ?? customer.email;
        customer.name = event.data.name ?? customer.name;
        customer.address = event.data.address ?? customer.address;

    
     await customer.save();
     console.log('Updated ' + customer.email);
 }


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

async function productAdded(event: Event) {
    //Order only keeps track of id and quantity
    let existingProduct = await database.getModel('Product').findOne({id: event.data.id});
    if (existingProduct) {
        //Update product quantity
        existingProduct.quantity += event.data.quantity;
        await existingProduct.save();
        return;
    }

    let product:Product = {
        id: event.data.id,
        quantity: event.data.quantity,
    }

    await database.getModel('Product').create(product);
    console.log("Product added in reading database: " + product.id);
}

async function productUpdated(event: Event) {
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
    customerCreatedEvent, 
    orderCreatedEvent, 
    productAdded, 
    productUpdated, 
    customerUpdatedEvent 
};