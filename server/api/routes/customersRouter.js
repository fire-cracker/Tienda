import express from 'express';
import passport from 'passport';

import { registerCustomer, loginCustomer, socialLogin } from '../controllers/customerController';
import { registerCustomerValidator, loginCustomerValidator } from '../middlewares/validation/customerValidation';

const customersRouter = express.Router();

customersRouter.post('/', registerCustomerValidator, registerCustomer);
customersRouter.post('/login', loginCustomerValidator, loginCustomer);
customersRouter.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
customersRouter.get('/facebook/redirect', passport.authenticate('facebook', { session: false }), socialLogin);


export default customersRouter;
