import express from 'express';

import { registerCustomer } from '../controllers/customerController';
import { registerCustomerValidator } from '../middlewares/validation/customerValidation';

const customersRouter = express.Router();

customersRouter.post('/', registerCustomerValidator, registerCustomer);

export default customersRouter;
