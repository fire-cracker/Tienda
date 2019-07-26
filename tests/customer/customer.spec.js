import fs from 'fs';
import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import passport from 'passport';
import sinon from 'sinon';

import app from '../../index';
import { sequelize } from '../../server/model/index';
import { mockStrategy } from '../mocks/mockFacebookStrategy';

import {
  registerCustomer, registerCustomer2, loginCustomer, loginCustomerWrongEmail,
  loginCustomerWrongPassword, customerProfileKeys, incorrectCustomerRegistration
} from '../mocks/mockCustomers';

chai.use(chaiHttp);

describe('Tests for customers', () => {
  before(async () => {
    const sql = await fs.promises.readFile(path.join(__dirname, '../../server/model/tshirtshop.sql'), 'utf8');
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });

    await chai.request(app)
      .post('/customers')
      .send(registerCustomer2);
    const fake = sinon.fake.returns(passport.use(mockStrategy));
    sinon.replace(passport, 'use', fake);
  });

  describe('Tests for register Customer', () => {
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

  describe('Tests for login Customer', () => {
    it('should login customer if request is correct', async () => {
      const res = await chai.request(app)
        .post('/customers/login')
        .send(loginCustomer);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys('customer', 'accessToken', 'expires_in')
        .and.to.have.property('customer')
        .and.to.have.deep.property('schema')
        .that.includes.all.keys(customerProfileKeys);
    });

    it('should return error if request to login customer is incorrect', async () => {
      const res = await chai.request(app)
        .post('/customers/login')
        .send(incorrectCustomerRegistration);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
    });

    it('should return error if customer email does not exist', async () => {
      const res = await chai.request(app)
        .post('/customers/login')
        .send(loginCustomerWrongEmail);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
      expect(res.body.error.message).to.equal('This email does not exist');
    });

    it('should return error if customer password is incorrect', async () => {
      const res = await chai.request(app)
        .post('/customers/login')
        .send(loginCustomerWrongPassword);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys([
          'status', 'code', 'message', 'field'
        ]);
      expect(res.body.error.message).to.equal('Email or Password is invalid');
    });
  });

  describe('Tests for Customer social login', () => {
    it('should add new customer through social login', async () => {
      const res = await chai.request(app)
        .get('/customers/facebook/redirect');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys('customer', 'accessToken', 'expires_in')
        .and.to.have.property('customer')
        .and.to.have.deep.property('schema')
        .that.includes.all.keys(customerProfileKeys);
    });
    it('should return details of customer if customer was added already through social login', async () => {
      const res = await chai.request(app)
        .get('/customers/facebook/redirect');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys('customer', 'accessToken', 'expires_in')
        .and.to.have.property('customer')
        .and.to.have.deep.property('schema')
        .that.includes.all.keys(customerProfileKeys);
    });
  });
});
