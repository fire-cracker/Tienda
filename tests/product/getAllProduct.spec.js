import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

describe('Tests to get all products', () => {
  it('should get all products', async () => {
    const res = await chai.request(app)
      .get('/api/products');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.count > 0).to.equal(true);
    expect(res.body.count).to.be.a('number');
    expect(res.body.rows.length > 0).to.equal(true);
    expect(res.body.rows).to.be.an('array');
  });

  it('should return error if parameters to get all products are incorrect', async () => {
    const res = await chai.request(app)
      .get('/api/products?description_length=30&limit=h&page=0');
    expect(res).to.have.status(422);
    expect(res.body.error.length > 0).to.equal(true);
  });
});

describe('Tests to get all products of a category ', () => {
  it('it should get all products', async () => {
    const res = await chai.request(app)
      .get('/api/products/inCategory/2');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.count > 0).to.equal(true);
    expect(res.body.count).to.be.a('number');
    expect(res.body.rows.length > 0).to.equal(true);
    expect(res.body.rows).to.be.an('array');
  });
  it('it should return empty array if category does not have any product', async () => {
    const res = await chai.request(app)
      .get('/api/products/inCategory/8');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.count).to.equal(0);
    expect(res.body.count).to.be.a('number');
    expect(res.body.rows.length).to.equal(0);
    expect(res.body.rows).to.be.an('array');
  });
  it('should return error if any of parameters are incorrect', async () => {
    const res = await chai.request(app)
      .get('/api/products/inCategory/2?description_length=30&limit=h&page=0');
    expect(res).to.have.status(422);
    expect(res.body.error.length > 0).to.equal(true);
  });
});
