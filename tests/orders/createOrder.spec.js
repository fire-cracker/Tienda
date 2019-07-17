import fs from 'fs';
import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import { sequelize } from '../../server/model/index';
import { registerCustomer, wrongAccessToken } from '../mocks/mockCustomers';
import { createOrder } from '../mocks/mockOrders';


chai.use(chaiHttp);

let customerToken;

describe('Tests for create Order', () => {
  before(async () => {
    const sql = await fs.promises.readFile(path.join(__dirname, '../../server/model/tshirtshop.sql'), 'utf8');
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });

    const { body: { accessToken } } = await chai.request(app)
      .post('/customers')
      .send(registerCustomer);
    customerToken = accessToken;

    await chai.request(app)
      .post('/shoppingcart/add')
      .send({ cart_id: 1, product_id: 1, attributes: 'bags' });
  });

  describe('Tests for update customer details', () => {
    it('should successfully create order if request is correct', async () => {
      const res = await chai.request(app)
        .post('/orders')
        .set('Authorization', `${customerToken}`)
        .send(createOrder);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('orderId');
    });

    it('should return error if cart does not exist in the shopping cart', async () => {
      const res = await chai.request(app)
        .post('/orders')
        .set('Authorization', `${customerToken}`)
        .send(createOrder);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });

    it('should return error if customer token is invalid', async () => {
      const res = await chai.request(app)
        .post('/orders')
        .set('Authorization', `${wrongAccessToken}`)
        .send(createOrder);
      expect(res).to.have.status(401);
    });
  });
});
