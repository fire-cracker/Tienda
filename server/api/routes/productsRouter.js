import express from 'express';
import {
  getAllProducts, getCatgoryProduct, getDepartmentProduct, searchProducts
} from '../controllers/productController';
import { getProductsValidator, searchProductsValidator } from '../middlewares/validation/productValidation';

const productsRouter = express.Router();

productsRouter.get('/', getProductsValidator, getAllProducts);
productsRouter.get('/inCategory/:categoryId', getProductsValidator, getCatgoryProduct);
productsRouter.get('/inDepartment/:departmentId', getProductsValidator, getDepartmentProduct);
productsRouter.get('/search', searchProductsValidator, searchProducts);

export default productsRouter;
