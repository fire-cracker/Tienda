import fs from 'fs';
import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { sequelize } from '../../server/model/index';

import {
  registerCustomer, registerCustomer2, customerProfileKeys, incorrectCustomerRegistration
} from '../mock/mockCustomers';

chai.use(chaiHttp);

describe('Tests for scustomers', () => {
  before(async () => {
    const sql = await fs.promises.readFile(path.join(__dirname, '../../server/model/tshirtshop.sql'), 'utf8');
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });
    await chai.request(app)
      .post('/customers')
      .send(registerCustomer2);
  });

  describe('Tests for register Customers', () => {
    it('should register customer if request is correct', async () => {
      const res = await chai.request(app)
        .post('/customers')
        .send(registerCustomer);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys('customer', 'accessToken', 'expires_in')
        .and.to.have.property('customer')
        .and.to.have.deep.property('schema')
        .that.includes.all.keys(customerProfileKeys);
    });

    it('should return error if request to register customer is incorrect', async () => {
      const res = await chai.request(app)
        .post('/customers')
        .send(incorrectCustomerRegistration);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });

    it('should return error if customer has been registered already', async () => {
      const res = await chai.request(app)
        .post('/customers')
        .send(registerCustomer2);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
      expect(res.body.error.message).to.equal('The email already exist.');
    });
  });
});
