import express from 'express';
import { getAllProducts, getCatgoryProduct, getDepartmentProduct } from '../controllers/productController';
import { getProductsValidator } from '../middlewares/validation/productValidation';

const productsRouter = express.Router();

productsRouter.get('/', getProductsValidator, getAllProducts);
productsRouter.get('/inCategory/:categoryId', getProductsValidator, getCatgoryProduct);
productsRouter.get('/inDepartment/:departmentId', getProductsValidator, getDepartmentProduct);

export default productsRouter;
