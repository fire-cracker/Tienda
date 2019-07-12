import { sequelize } from '../../model/index';

import { signToken } from '../helpers/tokenization';
import { hashPassword, passwordMatch } from '../helpers/password';

const customerToken = signToken({
  role: 'customer'
});

/**
* @export
* @function registerCustomer
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const registerCustomer = async (req, res) => {
  try {
    const {
      body: {
        name, email, password
      }
    } = req;

    const hashedPassword = await hashPassword(password);

    const customerExist = await sequelize.query(
      'CALL customer_get_login_info (:param)', {
        replacements: { param: email }
      }
    );

    if (customerExist.length) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'USR_04',
          message: 'The email already exist.',
          field: 'email'
        }
      });
    }
    const [customer] = await sequelize.query(
      'CALL customer_add (:param1, :param2, :param3)', {
        replacements: { param1: name, param2: email, param3: hashedPassword }
      }
    );
    delete customer.password;

    return res.status(200).send({
      customer: { schema: customer },
      accessToken: `Bearer ${customerToken}`,
      expires_in: '24h'
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function registerCustomer
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const loginCustomer = async (req, res) => {
  try {
    const { body: { email, password } } = req;

    const customer = await sequelize.query(
      'CALL customer_login (:param)', {
        replacements: { param: email }
      }
    );

    if (!customer.length) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'USR_05',
          message: 'This email does not exist',
          field: 'email'
        }
      });
    }

    if (passwordMatch(password, customer[0].password)) {
      delete customer[0].password;
      return res.status(200).send({
        customer: { schema: customer[0] },
        accessToken: `Bearer ${customerToken}`,
        expires_in: '24h'
      });
    }

    return res.status(400).send({
      error: {
        status: 400,
        code: 'USR_01',
        message: 'Email or Password is invalid',
        field: 'Password'
      }
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
