import fs from 'fs';
import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import { sequelize } from '../../server/model/index';

import {
  updateCustomer, registerCustomer, registerCustomer2,
  customerProfileKeys, updateWrongCustomer, updateAddress,
  updateWrongAddress
} from '../mocks/mockCustomers';

chai.use(chaiHttp);

let customerToken;
let customerToken2;

describe('Tests for update Customer account', () => {
  before(async () => {
    const sql = await fs.promises.readFile(path.join(__dirname, '../../server/model/tshirtshop.sql'), 'utf8');
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });
    const { body: { accessToken } } = await chai.request(app)
      .post('/customers')
      .send(registerCustomer2);
    customerToken = accessToken;

    const { body: { accessToken: accessToken2 } } = await chai.request(app)
      .post('/customers')
      .send(registerCustomer);
    customerToken2 = accessToken2;
  });

  describe('Tests for update customer details', () => {
    it('should return error if request to update customer account is incorrect', async () => {
      const res = await chai.request(app)
        .put('/customers')
        .set('Authorization', `${customerToken}`)
        .send(updateWrongCustomer);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });

    it('should successfully update customer details if request is correct', async () => {
      const res = await chai.request(app)
        .put('/customers')
        .set('Authorization', `${customerToken}`)
        .send(updateCustomer);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys(customerProfileKeys);
    });

    it('should return error if customer does not exist', async () => {
      const res = await chai.request(app)
        .put('/customers')
        .set('Authorization', `${customerToken}`)
        .send(registerCustomer2);
      expect(res).to.have.status(401);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });
  });

  describe('Tests for update customer address', () => {
    it('should return error if request to update customer address is incorrect', async () => {
      const res = await chai.request(app)
        .put('/customers/address')
        .set('Authorization', `${customerToken2}`)
        .send(updateWrongAddress);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });

    it('should successfully update customer address if request is correct', async () => {
      const res = await chai.request(app)
        .put('/customers/address')
        .set('Authorization', `${customerToken2}`)
        .send(updateAddress);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys(customerProfileKeys);
    });

    it('should return error if customer does not exist', async () => {
      const res = await chai.request(app)
        .put('/customers/address')
        .set('Authorization', `${customerToken}`)
        .send(registerCustomer);
      expect(res).to.have.status(401);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });
  });

  describe('Tests for update customer credit card detail', () => {
    it('should return error if request to update customer creditcard detail is incorrect', async () => {
      const res = await chai.request(app)
        .put('/customers/creditcard')
        .set('Authorization', `${customerToken2}`)
        .send({ credit_card: '43677079070./' });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });

    it('should successfully update customer creditcard detail if request is correct', async () => {
      const res = await chai.request(app)
        .put('/customers/creditcard')
        .set('Authorization', `${customerToken2}`)
        .send({ credit_card: '43677079070' });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys(customerProfileKeys);
    });

    it('should return error if customer does not exist', async () => {
      const res = await chai.request(app)
        .put('/customers/creditcard')
        .set('Authorization', `${customerToken}`)
        .send({ credit_card: '43677079070' });
      expect(res).to.have.status(401);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });
  });
});
