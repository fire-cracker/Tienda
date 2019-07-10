import express from 'express';
import { getAllProducts, getCatgoryProduct } from '../controllers/productController';
import { getProductsValidator } from '../middlewares/validation/productValidation';

const productsRouter = express.Router();

productsRouter.get('/', getProductsValidator, getAllProducts);
productsRouter.get('/inCategory/:categoryId', getProductsValidator, getCatgoryProduct);

export default productsRouter;
