import { Request, Response } from 'express';
import { database, Customer, amqp, customerRoutes } from '../../../libs/ball-com/export';

async function getAllCustomers(req: Request, res: Response) {
    //Get Customers from database
   let customers = await database.getModel('Customer').find()
    res.send(customers);
}

async function customerMiddleware(req: Request, res: Response, next: any) {
    let customer = await database.getModel('Customer').findOne({id: req.params.customerId});
    if (!customer) {
        res.status(404).send('Customer not found');
        return;
    }
    res.locals.customer = customer;
    next();
}

async function checkCreateRequest(req: Request, res: Response, next: any) {
    let customer = req.body as Customer;
    if (!customer.id || !customer.email || !customer.name || !customer.address) {
        res.status(400).send('Invalid request, missing properties');
        return;
    }
    next();
}


async function getCustomerByEmail(req: Request, res: Response) {
    res.send(res.locals.customer);
}

async function createCustomer(req: Request, res: Response) {
    if (await database.getModel('Customer').findOne({id: req.body.id})) {
        res.status(400).send('Customer already exists');
        return;
    }
    let customer:Customer = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    };

    //Store Customer in database save event
    await database.storeEvent(customerRoutes.create, customer, customer.id);
    amqp.publish(customerRoutes.create, customer);
    res.status(201).send('Customer succesfully created');
}

async function updateCustomer(req: Request, res: Response) {
    let customer = res.locals.customer;
    
    let updatedCustomer:Customer = {
        name: req.body.name ?? customer.name,
        email: req.body.email ?? customer.email,
        address: req.body.address ?? customer.address
    };

    await database.storeEvent(customerRoutes.update, updatedCustomer, customer.id);
    amqp.publish(customerRoutes.update, updatedCustomer);
    res.status(200).send('Customer succesfully updated');
}



export {
    getAllCustomers,
    getCustomerByEmail,
    createCustomer,
    customerMiddleware,
    checkCreateRequest,
    updateCustomer
}