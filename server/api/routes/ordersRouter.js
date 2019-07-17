import express from 'express';
import passport from 'passport';

import { createOrder } from '../controllers/ordersController';
import { createOrdersValidator } from '../middlewares/validation/ordersValidation';
import { authInterceptor } from '../middlewares/validation/validationHandler';

const ordersRouter = express.Router();

ordersRouter.post('/', passport.authenticate('jwt', { session: false }), authInterceptor, createOrdersValidator, createOrder);

export default ordersRouter;
