import { Router, Request, Response } from 'express';
import { database, Customer, amqp, customerRoutes } from '../../../libs/ball-com/export';

async function getAllCustomers(req: Request, res: Response) {
    //Get Customers from database
   let customers = await database.getModel('Customer').find()
    res.send(customers);
}

async function customerMiddleware(req: Request, res: Response, next: any) {
    let customer = await database.getModel('Customer').findOne({email: req.params.email});
    if (!customer) {
        res.status(404).send('Customer not found');
        return;
    }
    next();
}

async function getCustomerByEmail(req: Request, res: Response) {
    let customer = await database.getModel('Customer').findOne({email: req.params.email});
    res.send(customer);
}

async function createCustomer(req: Request, res: Response) {
    if (await database.getModel('Customer').findOne({email: req.body.email})) {
        res.status(400).send('Customer already exists');
        return;
    }
    let customer:Customer = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    };

    //Store Customer in database save event
    await database.storeEvent(customerRoutes.create, customer);
    amqp.publish(customerRoutes.create, customer);
    res.status(201).send('Customer succesfully created');
}



export {
    getAllCustomers,
    getCustomerByEmail,
    createCustomer,
    customerMiddleware
}