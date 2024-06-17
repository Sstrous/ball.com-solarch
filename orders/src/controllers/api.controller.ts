import { Request, Response } from 'express';
import { Order, amqp, database, orderRoutes } from '../../../libs/ball-com/export';

async function createOrder(req: Request, res: Response) {
   if (await database.getModel('Order').findOne({id: req.body.id})) {
        res.status(400).send('Order already exists');
        return;
    }

    let order:Order = {
        id: req.body.id,
        amount: req.body.amount,
        date: new Date(),
        productIds: req.body.productIds,
        customerEmail: req.body.customerEmail,
    };

    await database.storeEvent(orderRoutes.create, order);
    amqp.publish(orderRoutes.create, order);
    res.status(201).send('Order succesfully created');
}

async function orderMiddleware(req: Request, res: Response, next: any) {
    let order = await database.getModel('Order').findOne({id: req.params.orderId});
    if (!order) {
        res.status(404).send('Order not found');
        return;
    }

    next();
}


export {
    createOrder,
    orderMiddleware
}