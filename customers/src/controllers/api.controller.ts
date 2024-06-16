import { Router, Request, Response } from 'express';
import { database, Customer } from '../../../libs/ball-com/export';

async function getAllCustomers(req: Request, res: Response) {
    //Get Customers from database
    res.send('Get all customers');
}

async function getCustomerByEmail(req: Request, res: Response) {
    console.log("Get customer by email: " + req.params.email);
    //Get Customer from database
    res.send('Get customer by email');
}

async function createCustomer(req: Request, res: Response) {
    let customer:Customer = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    };

    //Store Customer in database save event
    await database.storeEvent('customers.created', customer);
    res.status(201).send('Customer succesfully created');
}



export {
    getAllCustomers,
    getCustomerByEmail,
    createCustomer,
}