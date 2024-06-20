import { Request, Response } from 'express';
import { Order, amqp, database, orderRoutes } from '../../../libs/ball-com/export';

async function createOrder(req: Request, res: Response) {
   if (await database.getModel('Order').findOne({id: req.body.id})) {
        res.status(400).send('Order already exists');
        return;
    }
    if (!await database.getModel('Customer').findById(req.body.customerId)) {
        res.status(404).send('Customer not found');
        return;
    }

    //Check if products exist in order database and are in stock
    for (let productList of req.body.productList) {
        console.log(productList)
        let product = await database.getModel('Product').findOne({id: productList.id});
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        if (product.quantity - productList.amount <= 0) {
            res.status(400).send('Product out of stock');
            return;
        }
    }

    //Create Order
    let order:Order = {
        id: req.body.id,
        date: new Date(),
        productList: req.body.productList,
    };

    //Update database and send event
    await database.storeEvent(orderRoutes.create, order);
    amqp.publish(orderRoutes.create, order);
    res.status(201).send('Order succesfully created');
}

    //Check if Order exists
async function orderMiddleware(req: Request, res: Response, next: any) {
    let order = await database.getModel('Order').findOne({id: req.params.orderId});
    if (!order) {
        res.status(404).send('Order not found');
        return;
    }

    next();
}

    //Update Order
async function updateOrder(req: Request, res: Response) {
    let oldOrder = await database.getModel('Order').findOne({id: req.params.orderId});
    let customer = await database.getModel('Customer').findById(req.params.customerId)

    if (!customer) {
        res.status(404).send('Customer not found');
        return;
    }

    let order:Order = {
        id: req.params.orderId ? req.params.orderId : oldOrder.id,
        date: new Date(),
        productList: req.body.productList ?? oldOrder.productList,
        customerId: req.body.customerId ?? oldOrder.customerId,
    };

    await database.storeEvent(orderRoutes.update, order);
    amqp.publish(orderRoutes.update, order);
    res.status(200).send('Order updated');
}


async function getAllOrders(req: Request, res: Response) {
    let orders = await database.getModel('Order').find();
    res.status(200).send(orders);
}


export {
    createOrder,
    orderMiddleware,
    updateOrder,
    getAllOrders
}