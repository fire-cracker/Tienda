import express from 'express';
import passport from 'passport';

import {
  registerCustomer, loginCustomer, socialLogin, updateCustomerAccount,
  updateCustomerAddress
} from '../controllers/customerController';
import {
  registerCustomerValidator, loginCustomerValidator,
  updateCustomerAccountValidator, updateCustomerAddressValidator
} from '../middlewares/validation/customerValidation';
import { authInterceptor } from '../middlewares/validation/validationHandler';

const customersRouter = express.Router();

customersRouter.post('/', registerCustomerValidator, registerCustomer);
customersRouter.post('/login', loginCustomerValidator, loginCustomer);
customersRouter.put('/', passport.authenticate('jwt', { session: false }), authInterceptor, updateCustomerAccountValidator, updateCustomerAccount);
customersRouter.put('/address', passport.authenticate('jwt', { session: false }), authInterceptor, updateCustomerAddressValidator, updateCustomerAddress);
customersRouter.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
customersRouter.get('/facebook/redirect', passport.authenticate('facebook', { session: false }), socialLogin);


export default customersRouter;
