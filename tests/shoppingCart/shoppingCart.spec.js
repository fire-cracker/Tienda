import fs from 'fs';
import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { sequelize } from '../../server/model/index';

import { errorFormat } from '../mocks/mockError';

chai.use(chaiHttp);

describe('Tests for shopping cart', () => {
  before(async () => {
    const sql = await fs.promises.readFile(path.join(__dirname, '../../server/model/tshirtshop.sql'), 'utf8');
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });
  });

  describe('Tests for add to Shopping Cart', () => {
    it('should add product to shopping cart', async () => {
      const res = await chai.request(app)
        .post('/shoppingcart/add')
        .send({ cart_id: 1, product_id: 1, attributes: 'bags' });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.be.an.instanceof(Array)
        .and.to.have.property(0)
        .that.includes.all.keys([
          'item_id', 'name', 'attributes', 'price', 'quantity', 'subtotal'
        ]);
    });

    it('should return error if request body to add product is incorrect', async () => {
      const res = await chai.request(app)
        .post('/shoppingcart/add')
        .send({ cart_id: 'e', product_id: 1, attributes: 'bags' });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an.instanceof(Object)
        .and.to.have.property('error')
        .that.includes.all.keys(errorFormat);
    });
  });
});
