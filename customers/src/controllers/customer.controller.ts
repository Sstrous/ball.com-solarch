import { Router, Request, Response } from 'express';
import Event from '../models/Event';
import * as database from "../database/database";


async function getAllCustomers(req: Request, res: Response) {
    //Get Customers from database
    res.send('Get all customers');
}

async function getCustomerById(req: Request, res: Response) {
    console.log("Get customer by email: " + req.params.email);
    //Get Customer from database
    res.send('Get customer by email');
}

async function createCustomer(req: Request, res: Response) {
    //Create Customer in database

}

async function rabbitMQConnectionTest(event:Event) {
    console.log("Connection called: " + event.data);
    await database.storeEvent("order.created", {name: "Spike", email: "Spike@mail.com", address: "TestAddress"}, "Spike@mail.com");
}

export {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    rabbitMQConnectionTest
}