import { signToken } from '../helpers/tokenization';
import { hashPassword, passwordMatch } from '../helpers/password';
import { maskString } from '../../utils/index';
import {
  getCustomer, createCustomer, login, updateAccount, updateAddress,
  updateCreditCard
} from '../services/customerService';


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

    const customerExist = await getCustomer(email);

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

    const [customer] = await createCustomer(name, email, hashedPassword);
    delete customer.password;

    const customerToken = signToken({
      role: 'customer',
      email
    });

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
* @function loginCustomer
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const loginCustomer = async (req, res) => {
  try {
    const { body: { email, password } } = req;

    const customer = await login(email);

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

    const customerToken = signToken({
      role: 'customer',
      email
    });

    if (passwordMatch(password, customer[0].password)) {
      delete customer[0].password;
      customer[0].credit_card = customer[0].credit_card ? maskString(customer[0].credit_card, 4) : customer[0].credit_card;

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

/**
* @export
* @function socialLogin
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const socialLogin = async (req, res) => {
  try {
    const {
      displayName, email, password
    } = req.user;

    const customerExist = await getCustomer(email);

    const customerToken = signToken({
      role: 'customer',
      email
    });

    if (customerExist.length) {
      const [customer] = await login(email);

      delete customer.password;

      return res.status(200).send({
        customer: { schema: customer },
        accessToken: `Bearer ${customerToken}`,
        expires_in: '24h'
      });
    }
    const [customer] = await createCustomer(displayName, email, password);

    delete customer.password;
    customer.credit_card = customer.credit_card ? maskString(customer.credit_card, 4) : customer.credit_card;

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
* @function updateCustomerAccount
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const updateCustomerAccount = async (req, res) => {
  try {
    const {
      body: {
        name, email, password,
        day_phone: dayPhone,
        eve_phone: evePhone,
        mob_phone: mobPhone
      },
      user: {
        customer_id: customerId,
        password: oldPassword,
        day_phone: oldDayPhone,
        eve_phone: oldEvePhone,
        mob_phone: oldMobPhone
      }
    } = req;

    const hashedPassword = password ? await hashPassword(password) : oldPassword;

    const [customer] = await updateAccount(
      customerId,
      name,
      email,
      hashedPassword,
      dayPhone === undefined ? oldDayPhone : dayPhone,
      evePhone === undefined ? oldEvePhone : evePhone,
      mobPhone === undefined ? oldMobPhone : mobPhone
    );

    delete customer.password;
    customer.credit_card = customer.credit_card ? maskString(customer.credit_card, 4) : customer.credit_card;

    return res.status(200).send(customer);
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function updateCustomerAddress
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const updateCustomerAddress = async (req, res) => {
  try {
    const {
      body: {
        address_1: address1,
        address_2: address2,
        city,
        region,
        postal_code: postalCode,
        country,
        shipping_region_id: shippingRegionId
      },
      user: {
        customer_id: customerId,
        address_2: oldAddress2,
      }
    } = req;


    const [customer] = await updateAddress(
      customerId,
      address1,
      address2 === undefined ? oldAddress2 : address2,
      city,
      region,
      postalCode,
      country,
      shippingRegionId
    );


    delete customer.password;
    customer.credit_card = customer.credit_card ? maskString(customer.credit_card, 4) : customer.credit_card;

    return res.status(200).send(customer);
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function updateCustomerCreditCard
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const updateCustomerCreditCard = async (req, res) => {
  try {
    const {
      body: {
        credit_card: creditCard,
      },
      user: {
        customer_id: customerId,
      }
    } = req;

    const [customer] = await updateCreditCard(customerId, creditCard);

    delete customer.password;
    customer.credit_card = maskString(customer.credit_card, 4);

    return res.status(200).send(customer);
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
