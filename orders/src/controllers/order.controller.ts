import { Request, Response } from 'express';

async function createOrder(req: Request, res: Response) {
    console.log(req.body)
    let order:Order = {
        id: req.body.id,
        amount: req.body.amount,
        date: new Date(),
        productId: req.body.productId,
        customerId: req.body.customerId,
    };

    publish('order.created', {order: 'order created'})
}


export {
    createOrder,
}