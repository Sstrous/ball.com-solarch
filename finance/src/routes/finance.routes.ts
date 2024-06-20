import { Router, Request, Response } from "express";
import * as financeController from '../controllers/api.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    financeController.getAllInvoices(req, res);
});

router.post('/create', (req: Request, res: Response) => {
    financeController.createInvoice(req, res);
});

router.all('/:invoiceID', financeController.invoiceMiddleware);

router.get('/:invoiceID', (req: Request, res: Response) => {
    financeController.getInvoiceById(req, res);
})

router.put('/:invoiceID', (req: Request, res: Response) => {
    financeController.updateInvoice(req, res);
});

router.delete('/:invoiceID', (req: Request, res: Response) => {
    financeController.deleteInvoice(req, res);
});

export default router;