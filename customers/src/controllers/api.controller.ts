import { Request, Response } from "express";
import {
  database,
  Customer,
  amqp,
  customerRoutes,
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

async function getCustomerByEmail(req: Request, res: Response) {
  res.send(res.locals.customer);
}

async function createCustomer(req: Request, res: Response) {

  if (await database.getModel("Customer").findOne({ id: res.locals.customer.id })) {
    res.status(400).send("Customer already exists");
    return;
  }

  try {
    //await database.getWriteConnection().model("Customer").create(res.locals.customer);
    await database.getReadConnection().model("Customer").create(res.locals.customer);
  } catch (e) {
    console.log(e);
    console.log("Error creating customer. Something went wrong in either creating the customer in the read or write DB.");
  }
  // Create the event
  const event = {
    type: customerRoutes.created,
    data: req.body,
    id: req.body.id,
    timestamp: new Date().toISOString()
  };

  //Store Customer in database save event
  await database.storeEvent(
    customerRoutes.created,
    event,
    req.body.id
  );
  amqp.publish(customerRoutes.created, event);

  res.status(201).send({
    message: "Customer successfully created, and is sent to the message broker.",
    event: event
  });
}

async function updateCustomer(req: Request, res: Response) {
  let customer = res.locals.customer;

  let updatedCustomer: Customer = {
    name: req.body.name ?? customer.name,
    phone: req.body.phone ?? customer.phone,
    address: req.body.address ?? customer.address,
    company: req.body.company ?? customer.company,
  };

  await database.storeEvent(
    customerRoutes.updated,
    updatedCustomer,
    customer.id
  );
  amqp.publish(customerRoutes.updated, updatedCustomer);
  res.status(200).send("Customer succesfully updated");
}

export {
  getAllCustomers,
  getCustomerByEmail,
  createCustomer,
  customerMiddleware,
  checkCreateRequest,
  updateCustomer,
};
