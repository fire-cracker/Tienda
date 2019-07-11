import fs from 'fs';
import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { sequelize } from '../../server/model/index';

chai.use(chaiHttp);

describe('Tests for get Product', () => {
  before(async () => {
    const sql = await fs.promises.readFile(path.join(__dirname, '../../server/model/tshirtshop.sql'), 'utf8');
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });
  });

  describe('Tests to get all products', () => {
    it('should get all products', async () => {
      const res = await chai.request(app)
        .get('/products');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.count > 0).to.equal(true);
      expect(res.body.count).to.be.a('number');
      expect(res.body.rows.length > 0).to.equal(true);
      expect(res.body.rows).to.be.an('array');
    });

    it('should return error if parameters to get all products are incorrect', async () => {
      const res = await chai.request(app)
        .get('/products?description_length=30&limit=h&page=0');
      expect(res).to.have.status(400);
      expect(res.body.error.length > 0).to.equal(true);
    });
  });

  describe('Tests to get all products of a category ', () => {
    it('it should get all products', async () => {
      const res = await chai.request(app)
        .get('/products/inCategory/2');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.count > 0).to.equal(true);
      expect(res.body.count).to.be.a('number');
      expect(res.body.rows.length > 0).to.equal(true);
      expect(res.body.rows).to.be.an('array');
    });
    it('it should return empty array if category does not have any product', async () => {
      const res = await chai.request(app)
        .get('/products/inCategory/8');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.count).to.equal(0);
      expect(res.body.count).to.be.a('number');
      expect(res.body.rows.length).to.equal(0);
      expect(res.body.rows).to.be.an('array');
    });
    it('should return error if any of parameters are incorrect', async () => {
      const res = await chai.request(app)
        .get('/products/inCategory/2?description_length=30&limit=h&page=0');
      expect(res).to.have.status(400);
      expect(res.body.error.length > 0).to.equal(true);
    });
  });

  describe('Tests to get all products of a department ', () => {
    it('it should get all products', async () => {
      const res = await chai.request(app)
        .get('/products/inDepartment/2');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.count > 0).to.equal(true);
      expect(res.body.count).to.be.a('number');
      expect(res.body.rows.length > 0).to.equal(true);
      expect(res.body.rows).to.be.an('array');
    });
    it('it should return empty array if department does not have any product', async () => {
      const res = await chai.request(app)
        .get('/products/inDepartment/50');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.count).to.equal(0);
      expect(res.body.count).to.be.a('number');
      expect(res.body.rows.length).to.equal(0);
      expect(res.body.rows).to.be.an('array');
    });
    it('should return error if any of parameters are incorrect', async () => {
      const res = await chai.request(app)
        .get('/products/inDepartment/2?description_length=30&limit=h&page=0');
      expect(res).to.have.status(400);
      expect(res.body.error.length > 0).to.equal(true);
    });
  });

  describe('Tests to search for products ', () => {
    it('it should get all products that have the search word', async () => {
      const res = await chai.request(app)
        .get('/products/search?query_string=peace');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.count > 0).to.equal(true);
      expect(res.body.count).to.be.a('number');
      expect(res.body.rows.length > 0).to.equal(true);
      expect(res.body.rows).to.be.an('array');
    });
    it('it should return empty array if no product has the search query', async () => {
      const res = await chai.request(app)
        .get('/products/search?query_string=serendipity');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.count).to.equal(0);
      expect(res.body.count).to.be.a('number');
      expect(res.body.rows.length).to.equal(0);
      expect(res.body.rows).to.be.an('array');
    });
    it('should return error if any of parameters are incorrect', async () => {
      const res = await chai.request(app)
        .get('/products/search?query_string=peace&description_length=30&limit=h&page=0');
      expect(res).to.have.status(400);
      expect(res.body.error.length > 0).to.equal(true);
    });
  });

  describe('Tests to get a product', () => {
    it('should return a product with the details', async () => {
      const res = await chai.request(app)
        .get('/products/1/details');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an.instanceof(Object)
        .that.includes.all.keys([
          'product_id', 'name', 'description', 'price', 'discounted_price', 'image', 'image_2'
        ]);
    });

    it('should return error message if product does not exist', async () => {
      const res = await chai.request(app)
        .get('/products/500/details');

      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('Product does not exist');
      expect(res.body.code).to.equal('PRO_01');
      expect(res.body.field).to.equal('Product Id');
    });

    it('should return error if parameters to get all products are incorrect', async () => {
      const res = await chai.request(app)
        .get('/products/h/details');
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('"productId" must be a number');
      expect(res.body.field).to.equal('productId');
    });
  });
});
