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
