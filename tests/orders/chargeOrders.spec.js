import fs from 'fs';
import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import { sequelize } from '../../server/model/index';
import { errorFormat } from '../mocks/mockError';
import {
  chargeOrder, wrongChargeOrder, wrongChargeOrder2, chargeOrderTokenError
} from '../mocks/mockChargeOrder';
import { registerCustomer2 } from '../mocks/mockCustomers';
import { createOrder } from '../mocks/mockOrders';

chai.use(chaiHttp);

let customerToken;

describe('Tests for creating charge for an order', () => {
  before(async () => {
    const sql = await fs.promises.readFile(path.join(__dirname, '../../server/model/tshirtshop.sql'), 'utf8');
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });

    const { body: { accessToken } } = await chai.request(app)
      .post('/customers')
      .send(registerCustomer2);
    customerToken = accessToken;

    await chai.request(app)
      .post('/shoppingcart/add')
      .send({ cart_id: 1, product_id: 1, attributes: 'bags' });

    await chai.request(app)
      .post('/orders')
      .set('Authorization', `${customerToken}`)
      .send(createOrder);
  });

  describe('test for order confirmation mail', async () => {
    it('should create charge succesfully for an order', async () => {
      const res = await chai.request(app)
        .post('/stripe/charge')
        .set('Authorization', `${customerToken}`)
        .send(chargeOrder);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object);
    });

    it('should return error if request body to create charge is incorrect', async () => {
      const res = await chai.request(app)
        .post('/stripe/charge')
        .set('Authorization', `${customerToken}`)
        .send(wrongChargeOrder2);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys(errorFormat);
    });

    it('should return error if stripe token is incorrect', async () => {
      const res = await chai.request(app)
        .post('/stripe/charge')
        .set('Authorization', `${customerToken}`)
        .send(wrongChargeOrder);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys(chargeOrderTokenError);
    });
  });
  // describe('test for order confirmation mail', async () => {
  //   it('should send order confirmation mail', async () => {
  //     const stub = sinon.stub(orderConfirmationMail, 'send').resolves();
  //     console.log(stub)
  //   });
  // });
});
