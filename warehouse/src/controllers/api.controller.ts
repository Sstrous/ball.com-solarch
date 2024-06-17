import { Request, Response } from 'express';
import { database, amqp, Product, productRoutes } from '../../../libs/ball-com/export';
import { storeEvent } from '../../../libs/ball-com/database/database';

async function getAllProducts(req: Request, res: Response) {
    //Get Customers from database
   let products = await database.getModel('Product').find()
    res.send(products);
}

async function productMiddleware(req: Request, res: Response, next: any) {
    let product = await database.getModel('Product').findOne({id: req.params.id});
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    next();
}

async function getProductById(req: Request, res: Response) {
    let product = await database.getModel('Product').findOne({id: req.params.id});
    res.send(product);
}

async function createProduct(req: Request, res: Response) {
    if (await database.getModel('Product').findOne({id: req.body.id})) {
        res.status(400).send('Product already exists');
        return;
    }

    let product:Product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        sellerEmail: req.body.sellerEmail
    };

    //Store Customer in database save event
    await database.storeEvent(productRoutes.add, product);
    amqp.publish(productRoutes.add, product);
    res.status(201).send('Product succesfully added to warehouse');
}

async function updateProduct(req: Request, res: Response) {
    let oldProduct = await database.getModel('Product').findOne({id: req.params.id});

    let product:Product = {
        id: oldProduct.id,
        name: req.body.name ?? oldProduct.name,
        price: req.body.price ?? oldProduct.price,
        description: req.body.description ?? oldProduct.description,
        quantity: req.body.quantity ?? oldProduct.quantity,
        sellerEmail: req.body.sellerEmail ?? oldProduct.sellerEmail
    }

    //Update product in database
    await storeEvent(productRoutes.update, product);
    amqp.publish(productRoutes.update, product);
    res.status(200).send('Product updated');
}



export {
    getAllProducts,
    productMiddleware,
    getProductById,
    createProduct,
    updateProduct
}