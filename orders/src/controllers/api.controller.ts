import { Request, Response } from 'express';
import { Order, amqp, database, orderRoutes } from '../../../libs/ball-com/export';

async function createOrder(req: Request, res: Response) {
   if (await database.getModel('Order').findOne({id: req.body.id})) {
        res.status(400).send('Order already exists');
        return;
    }
    if (!await database.getModel('Customer').findOne({id: req.body.id})) {
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
        customerName: req.body.customerName,
    };

    //Update database and send event
    await database.storeEvent(orderRoutes.create, order, order.id);
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
    res.locals.order = order;
    next();
}

async function checkCreateRequest(req: Request, res: Response, next: any) {
    let order = req.body as Order;
    if (!order.id || !order.customerName || !order.productList) {
        res.status(400).send('Invalid request, missing properties');
        return;
    }
    next();
}

    //Update Order
async function updateOrder(req: Request, res: Response) {
    let oldOrder = res.locals.order;
    let customer = await database.getModel('Customer').findOne({email: req.body.customerEmail});

    if (!customer) {
        res.status(404).send('Customer not found');
        return;
    }

    let order:Order = {
        id: oldOrder.id,
        date: new Date(),
        productList: req.body.productList ?? oldOrder.productList,
        customerName: req.body.customerName ?? oldOrder.customerName,
    };

    await database.storeEvent(orderRoutes.update, order, order.id);
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
    checkCreateRequest,
    updateOrder,
    getAllOrders
}