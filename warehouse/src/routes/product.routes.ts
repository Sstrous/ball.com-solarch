import { Router, Request, Response } from 'express';
import * as productController from '../controllers/api.controller'

// New Router instance
const router = Router();

// Get all customers
router.get('/', (req: Request, res: Response) => {
  productController.getAllProducts(req, res);
});

router.post('/create', (req: Request, res: Response) => {
  productController.createProduct(req, res);
})

router.all('/:productId', productController.productMiddleware);

router.put('/:productId', (req: Request, res: Response) => {
  productController.updateProduct(req, res);
});

router.get('/:productId', (req: Request, res: Response) => {
  productController.getProductById(req, res);
})

export default router;