import { Request, Response } from 'express';
import { database, amqp, Logistics, logisticRoutes } from '../../../libs/ball-com/export';

async function logisticMiddleware(req: Request, res: Response, next: any) {
    let company = await database.getModel('Logistic').findOne({id: req.params.companyId});
    if (!company) {
        res.status(404).send('Company not found');
        return;
    }
    res.locals.logistics = company as Logistics;
    next();
}

async function checkCreateRequest(req: Request, res: Response, next: any) {
    let logistics = req.body as Logistics;
    if (!logistics.id || !logistics.phone || !logistics.email || !logistics.address || !logistics.companyName) {
        res.status(400).send('Invalid request, missing properties');
        return;
    }
    next();
}

async function getAllDeliveryCompanies(req: Request, res: Response) {
    let companies = await database.getModel('Logistic').find();
    res.send(companies);
}

async function getCompanyById(req: Request, res: Response) {
    res.send(res.locals.logistics);
}

async function addDeliveryCompany(req: Request, res: Response) {
    let logisticsCompany = req.body as Logistics;
    await database.storeEvent(logisticRoutes.add, logisticsCompany, logisticsCompany.id);
    amqp.publish(logisticRoutes.add, logisticsCompany);
    res.status(201).send('Logistics added');
}

async function updateCompany(req: Request, res:Response) {
    let company = res.locals.logistics as Logistics;
    let updatedCompany:Logistics = {
        phone: req.body.phone ?? company.phone,
        email: req.body.email ?? company.email,
        address: req.body.address ?? company.address,
        companyName: req.body.companyName ?? company.companyName
    };
    await database.storeEvent(logisticRoutes.update, updatedCompany, company.id);
    amqp.publish(logisticRoutes.update, updatedCompany);
    res.status(200).send('Company updated');
}

export {
    logisticMiddleware,
    getAllDeliveryCompanies,
    getCompanyById,
    updateCompany,
    checkCreateRequest,
    addDeliveryCompany
}