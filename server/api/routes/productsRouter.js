import express from 'express';
import { getAllProducts } from '../controllers/productController';
import { getAllProductValidator } from '../middlewares/validation/productValidation';

const productsRouter = express.Router();

productsRouter.get('/', getAllProductValidator, getAllProducts);

export default productsRouter;
