import { Request, Response } from 'express';
import { database, amqp, Product, productRoutes } from '../../../libs/ball-com/export';

async function getAllProducts(req: Request, res: Response) {
    //Get Customers from database
   let products = await database.getModel('Product').find()
    res.send(products);
}

async function productMiddleware(req: Request, res: Response, next: any) {
    let product = await database.getModel('Product').findOne({id: req.params.productId});
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }

    res.locals.product = product as Product;
    next();
}

async function checkCreateRequest(req: Request, res: Response, next: any) {
    let product = req.body as Product;
    if (!product.id || !product.name || !product.price || !product.description || !product.warehouseId || !product.quantity || !product.sellerId) {
        res.status(400).send('Invalid request, missing properties');
        return;
    }
    if (await database.getModel('Product').findOne({id: product.id})) {
        res.status(400).send('Product already exists');
        return;
    }

    if (!await database.getModel('Customer').findOne({id: product.sellerId})) {
        res.status(404).send('Seller not found');
        return;
    }

    if (!await database.getModel('Warehouse').findOne({id: product.warehouseId})) {
        res.status(404).send('Warehouse not found');
        return;
    }
    res.locals.product = product;
    next();
}

async function getProductById(req: Request, res: Response) {
    res.send(res.locals.product);
}

async function createProduct(req: Request, res: Response) {
    let product = res.locals.product;

    //Store Product in database save event
    await database.storeEvent(productRoutes.add, product, product.id);
    amqp.publish(productRoutes.add, product);
    res.status(201).send('Product succesfully added to warehouse');
}

async function updateProduct(req: Request, res: Response) {
   let oldProduct = res.locals.product;

    let product:Product = {
        name: req.body.name ?? oldProduct.name,
        price: req.body.price ?? oldProduct.price,
        description: req.body.description ?? oldProduct.description,
        quantity: req.body.quantity ?? oldProduct.quantity,
        sellerId: req.body.sellerId ?? oldProduct.sellerId,
        warehouseId: req.body.warehouseId ?? oldProduct.warehouseId
    }

    if (!await database.getModel('Customer').findOne({id: product.sellerId})) {
        res.status(404).send('Seller not found');
        return;
    }

    if (!await database.getModel('Warehouse').findOne({id: product.warehouseId})) {
        res.status(404).send('Warehouse not found');
        return;
    }

    //Update product in database
    await database.storeEvent(productRoutes.update, product, oldProduct.id);
    amqp.publish(productRoutes.update, product);
    res.status(200).send('Product updated');
}



export {
    getAllProducts,
    productMiddleware,
    checkCreateRequest,
    getProductById,
    createProduct,
    updateProduct
}