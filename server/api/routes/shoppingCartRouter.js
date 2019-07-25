import express from 'express';

import { addToShoppingCart } from '../controllers/shoppingCartController';
import { addToShoppingCartValidator } from '../middlewares/validation/shoppingCartValidation';

const shoppingCartRouter = express.Router();

shoppingCartRouter.post('/add',
  addToShoppingCartValidator,
  addToShoppingCart);

export default shoppingCartRouter;
