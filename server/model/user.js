import sequelize from './index';

class User {
  constructor() {
    this.db = sequelize;
  }

  async get() {
    const users = await this.db.query('CALL catalog_get_categories');
    console.log(users, 'users ----------');
    return users;
  }
}

export default new User();
