import { sequelize } from '../../model/index';

import { signToken } from '../helpers/tokenization';
import { hashPassword } from '../helpers/password';

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

    const token = signToken({
      role: 'customer'
    });

    return res.status(200).send({
      customer: { schema: customer },
      accessToken: `Bearer ${token}`,
      expires_in: '24h'
    });
  } catch (error) {
    console.log('error>>>>>>>>>>>', error);
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
