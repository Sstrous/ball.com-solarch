import { Router, Request, Response } from 'express';

import { amqp, Order } from '../../../libs/ball-com/export';

async function createOrder(req: Request, res: Response) {
    let order:Order = {
        id: req.body.id,
        amount: req.body.amount,
        date: new Date(),
        productId: req.body.productId,
        customerId: req.body.customerId,
    };

    amqp.publish('orders.created', order);
    res.status(200).send('Order created');
}

export {
    createOrder,
}