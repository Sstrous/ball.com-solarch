import { database, Event, Product } from "../../../../libs/ball-com/export";

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
    productAdded,
    productUpdated
}