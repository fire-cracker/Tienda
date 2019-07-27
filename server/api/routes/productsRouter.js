import express from 'express';
import {
  getAllProducts, getCategoryProducts, getDepartmentProducts, searchProducts,
  getProductDetails
} from '../controllers/productController';
import { paramsValidator } from '../middlewares/validation/paramsValidation';
import { getProductsValidator, searchProductsValidator } from '../middlewares/validation/productValidation';

const productsRouter = express.Router();

productsRouter.get('/',
  getProductsValidator,
  getAllProducts);

productsRouter.get('/inCategory/:categoryId',
  paramsValidator,
  getProductsValidator,
  getCategoryProducts);

productsRouter.get('/inDepartment/:departmentId',
  paramsValidator,
  getProductsValidator,
  getDepartmentProducts);

productsRouter.get('/search',
  searchProductsValidator,
  searchProducts);

productsRouter.get('/:productId/details',
  paramsValidator,
  getProductDetails);

export default productsRouter;
