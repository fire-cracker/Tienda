import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

import auth from './server/api/middlewares/authentication/authenticate';
import productsRouter from './server/api/routes/productsRouter';
import shoppingCartRouter from './server/api/routes/shoppingCartRouter';
import customersRouter from './server/api/routes/customersRouter';
import ordersRouter from './server/api/routes/ordersRouter';
import chargeRouter from './server/api/routes/chargeRouter';

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});

dotenv.config();

const port = process.env.PORT || process.env.LOCAL_PORT;
// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: 'nodeproject',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static(`${__dirname}/public`));
app.use(auth.initialize());
app.use('/products', productsRouter);
app.use('/shoppingcart', shoppingCartRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/stripe', chargeRouter);

app.get('/', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to my Node Project!'
}));

app.get('*', (req, res) => res.status(200).send({
  status: 'fail',
  message: 'Route not found',
}));

app.listen(port, () => {
  logger.debug(`Server running on port ${chalk.blue(port)}`);
});

export default app;
