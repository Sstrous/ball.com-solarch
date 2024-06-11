import { Router, Request, Response } from 'express';
import Event from '../models/Event';
import { publish } from '../rabbitmq/amqp';

async function createOrder(req: Request, res: Response) {
    //Get Customers from database
    res.send("Create Order")

    publish('order.created', {order: 'order created'})
}


export {
    createOrder,
}