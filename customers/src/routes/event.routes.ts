import { Router, Request, Response } from 'express';
import * as eventController from '../controllers/event.controller';
import * as customerController from "../controllers/api.controller";
import {getAllEventsAndPublish} from "../controllers/event.controller";

// New Router instance
const router = Router();

// Get all customers
router.get('/events', (req: Request, res: Response) => {
    eventController.getAllEventsAndPublish(req, res);
});

router.get('/orders', (req: Request, res: Response) => {
    eventController.getAllOrderEvents(req, res);
});

router.get('/customers', (req: Request, res: Response) => {
    eventController.getAllCustomerEvents(req, res);
});





export default router;