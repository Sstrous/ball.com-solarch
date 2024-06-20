import { Request, Response } from 'express';
import { database, Invoice, amqp, invoiceRoutes } from '../../../libs/ball-com/export';

async function invoiceMiddleware(req: Request, res: Response, next: any) {

    let invoice = await database.getModel('Invoice').findById(req.params.id);

    if (!invoice) {
        res.status(404).send('Invoice not found');
        return;
    }

    next();
}

async function getAllInvoices(req: Request, res: Response) {

    let invoices = await database.getModel('Invoice').find();

    res.send(invoices);
}

async function getInvoiceById(req: Request, res: Response) {

    let invoice = await database.getModel('Invoice').find({ 'ObjectID': req.params.id })

    res.send(invoice);
}

async function createInvoice(req: Request, res: Response) {

    let customer = await database.getModel('Customer').findById(req.body.customerID)

    if (!customer) {
        res.status(404).send('Customer does not exist')
        return;
    }

    let invoice: Invoice = {
        customerId: req.body.customerId,
        paid: req.body.paid, 
        price: req.body.price,
        PaymentType: req.body.PaymentType,
        orderId: req.body.orderId
    }

    // store and publish event
    await database.storeEvent(invoiceRoutes.created, invoice);
    amqp.publish(invoiceRoutes.created, customer);
    
    res.sendStatus(201);
}

async function updateInvoice(req: Request, res: Response) {

    let oldInvoice = await database.getModel('Invoice').findById(req.body.id)

    if (!oldInvoice) {
        res.status(404).send('Invoice does not exist')
        return;
    }

    // Invoice DATE should not be updateable
    let newInvoice: Invoice = {
        customerId: req.body.customerId,
        paid: req.body.paid, 
        price: req.body.price,
        PaymentType: req.body.PaymentType,
        orderId: req.body.orderId
    }

    // store and publish event
    await database.storeEvent(invoiceRoutes.updated, newInvoice);
    amqp.publish(invoiceRoutes.created, newInvoice);
    
    res.sendStatus(201);
}

async function deleteInvoice(req: Request, res: Response) {

    let invoice = await database.getModel('Invoice').findById(req.body.invoiceID)

    // store and publish event
    await database.storeEvent(invoiceRoutes.deleted, invoice);
    amqp.publish(invoiceRoutes.created, invoice);
    
    res.sendStatus(201);
}

export {
    invoiceMiddleware,
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
}