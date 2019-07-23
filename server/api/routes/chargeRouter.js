import express from 'express';
import passport from 'passport';

import { createCharge } from '../controllers/chargeController';
import { authInterceptor } from '../middlewares/validation/validationHandler';
import {
  chargeOrderValidator
} from '../middlewares/validation/chargeValidation';

const chargeRouter = express.Router();

chargeRouter.post('/charge',
  passport.authenticate('jwt',
    { session: false }),
  authInterceptor,
  chargeOrderValidator,
  createCharge);

export default chargeRouter;
