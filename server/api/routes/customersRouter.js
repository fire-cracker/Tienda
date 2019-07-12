import express from 'express';

import { registerCustomer, loginCustomer } from '../controllers/customerController';
import { registerCustomerValidator, loginCustomerValidator } from '../middlewares/validation/customerValidation';

const customersRouter = express.Router();

customersRouter.post('/', registerCustomerValidator, registerCustomer);
customersRouter.post('/login', loginCustomerValidator, loginCustomer);

export default customersRouter;
