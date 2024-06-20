import { Request, Response } from 'express';
import { database, amqp, Warehouse, warehouseRoutes } from '../../../libs/ball-com/export';

async function warehouseMiddleware(req: Request, res: Response, next: any) {
    let warehouse = await database.getModel('Warehouse').findOne({id: req.params.warehouseId});
    if (!warehouse) {
        res.status(404).send('Warehouse not found');
        return;
    }
    res.locals.warehouse = warehouse as Warehouse;
    next();
}

async function checkCreateRequest(req: Request, res: Response, next: any) {
    let warehouse = req.body as Warehouse;
    if (!warehouse.id || !warehouse.address) {
        res.status(400).send('Invalid request, missing properties');
        return;
    }
    res.locals.warehouse = warehouse;
    next();
}

async function getWarehouses(req: Request, res: Response) {
    res.send(await database.getModel('Warehouse').find());
}

async function addWarehouse(req: Request, res: Response) {
    let warehouse = res.locals.warehouse
    if (await database.getModel('Warehouse').findOne({id: warehouse.id})) {
        res.status(400).send('Warehouse already exists');
        return;
    }
    await database.storeEvent(warehouseRoutes.add, warehouse, warehouse.id);
    amqp.publish(warehouseRoutes.add, warehouse);
}

async function getWarehouseById(req:Request, res:Response) {
    res.send(res.locals.warehouse);
}

async function updateWarehouse(req:Request, res:Response) {
    let oldWarehouse = res.locals.warehouse;
    let warehouse:Warehouse = {
        address: req.body.address ?? oldWarehouse.address,
    };
    await database.storeEvent(warehouseRoutes.update, warehouse, oldWarehouse.id);
    amqp.publish(warehouseRoutes.update, warehouse);
    res.status(200).send('Warehouse updated');   
}



export {
    warehouseMiddleware,
    checkCreateRequest,
    getWarehouses,
    addWarehouse,
    getWarehouseById,
    updateWarehouse
}