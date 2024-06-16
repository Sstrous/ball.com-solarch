import { Request, Response } from 'express';
import { Order, amqp } from '../../../libs/ball-com/export';

async function createOrder(req: Request, res: Response) {
    console.log(req.body)
    let order:Order = {
        id: req.body.id,
        amount: req.body.amount,
        date: new Date(),
        productId: req.body.productId,
        customerId: req.body.customerId,
    };

    amqp.publish('orders.created', {order: order});
}


export {
    createOrder,
}