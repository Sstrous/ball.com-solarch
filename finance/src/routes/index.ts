import { Router } from "express";
import financeRoutes from './finance.routes';

const router = Router()

router.use('/finance', financeRoutes);

export default router;