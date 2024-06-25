import { Request, Response } from "express";
import {
  database,
  Customer,
  amqp,
  customerRoutes,
  EventSchema,
} from "../../../libs/ball-com/export";
import CustomerSchema from "../../schemas/CustomerSchema";


async function getAllCustomers(req: Request, res: Response) {
  //Get Customers from database
  let customers = await database.getModel("Customer").find();
  res.send(customers);
}

async function customerMiddleware(req: Request, res: Response, next: any) {
  let customer = await database
    .getModel("Customer")
    .findOne({ id: req.params.customerId });
  if (!customer) {
    res.status(404).send("Customer not found");
    return;
  }
  res.locals.customer = customer;
  next();
}

async function checkCreateRequest(req: Request, res: Response, next: any) {
  let customer = req.body;
  let required:Customer = CustomerSchema.obj;
  for (let key in required) {
    if (!customer[key]) {
      res.status(400).send(`Missing ${key}`);
      return;
    }
  }
  res.locals.customer = customer as Customer;
  next();
}

async function getCustomerByID(req: Request, res: Response) {
  let customerId = req.params.customerId;
  let eventsData: any;

  eventsData = await database.getModelWrite("Event").find({id: customerId}).sort({ timestamp: 1 });
  let customer: any = eventsData[0].data;
  customer = JSON.parse(customer);

  for(let event of eventsData) {
    if (event.type == 'customers.created'){
      continue
    }
    let eventData = JSON.parse(event.data);
    for(let key of Object.keys(eventData.updates)) {
      customer[key] = eventData.updates[key];
    }
  }

  res.status(200).send(JSON.stringify(customer));
}

async function createCustomer(req: Request, res: Response) {
  if (await database.getModel("Customer").findOne({ id: res.locals.customer.id })) {
    res.status(400).send("Customer already exists");
    return;
  }

  //Store Customer in database save event
  await database.storeEvent(
    customerRoutes.created,
    res.locals.customer,
    res.locals.customer.id
  );
  amqp.publish(customerRoutes.created, res.locals.customer);
  res.status(201).send("Customer succesfully created");
}

async function updateCustomer(req: Request, res: Response) {
  let customer = res.locals.customer;
  let updates = req.body;

  let data = {
    customerId: customer.id,
    updates: updates,
  }

  try {
    await database.storeEvent(customerRoutes.updated, data, customer.id);
  } catch (e) {
    res.status(400).send("Something went wrong on storing the event!")
  }
  try {
    amqp.publish(customerRoutes.updated, data);
  }catch (e) {
    res.status(400).send("Something went wrong on publishing the event!")
  }

  res.status(200).send("Customer succesfully updated");
}



export {
  getAllCustomers,
  getCustomerByID,
  createCustomer,
  customerMiddleware,
  checkCreateRequest,
  updateCustomer,
};
