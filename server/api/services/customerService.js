import { sequelize } from '../../model/index';

/**
* @export
* @function getCustomer
* @param {String} email - customer email
* @returns {Object} object
*/
export const getCustomer = async (email) => {
  const customerExist = await sequelize.query(
    'CALL customer_get_login_info (:param)', {
      replacements: { param: email }
    }
  );
  return customerExist;
};

/**
* @export
* @function createCustomer
* @param {String} name - customer name
* @param {String} email - customer email
* @param {String} hashedPassword - customer password
* @returns {Object} object
*/
export const createCustomer = async (name, email, hashedPassword) => {
  const customer = await sequelize.query(
    'CALL customer_add (:param1, :param2, :param3)', {
      replacements: { param1: name, param2: email, param3: hashedPassword }
    }
  );
  return customer;
};

/**
* @export
* @function login
* @param {String} email - customer email
* @returns {Object} object
*/
export const login = async (email) => {
  const customer = await sequelize.query(
    'CALL customer_login (:param)', {
      replacements: { param: email }
    }
  );
  return customer;
};

/**
* @export
* @function updateCustomer
* @param {String} customerId - customer name
* @param {String} name - customer name
* @param {String} email - customer email
* @param {String} hashedPassword - customer password
* @param {Integer} dayPhone - customer work phone number
* @param {Integer} evePhone - customer home phone number
* @param {Integer} mobPhone - customer mobile phone number
* @returns {Object} object
*/
export const updateAccount = async (customerId,
  name,
  email,
  hashedPassword,
  dayPhone,
  evePhone,
  mobPhone) => {
  const customer = await sequelize.query(
    'CALL customer_update_account (:param1, :param2, :param3, :param4, :param5, :param6, :param7)', {
      replacements: {
        param1: customerId,
        param2: name,
        param3: email,
        param4: hashedPassword,
        param5: dayPhone,
        param6: evePhone,
        param7: mobPhone
      }
    }
  );
  return customer;
};
/**
* @export
* @function updateCustomer
* @param {Integer} customerId - id of customer to be updated
* @param {String} address1 - customer address
* @param {String} address2 - customer other address
* @param {String} city - customer city
* @param {String} region - customer region
* @param {Integer} postalCode - customer postal code
* @param {String} country - customer country
* @param {Integer} shippingRegionId - id of customer shipping region
* @returns {Object} object
*/
export const updateAddress = async (customerId,
  address1,
  address2,
  city,
  region,
  postalCode,
  country,
  shippingRegionId) => {
  const customer = await sequelize.query(
    'CALL customer_update_address (:param1, :param2, :param3, :param4, :param5, :param6, :param7, :param8)', {
      replacements: {
        param1: customerId,
        param2: address1,
        param3: address2,
        param4: city,
        param5: region,
        param6: postalCode,
        param7: country,
        param8: shippingRegionId
      }
    }
  );
  return customer;
};

/**
* @export
* @function updateCreditCard
* @param {Integer} customerId - id of customer whose creditcard is to be updated
* @param {String} creditCard - customer credit card
* @returns {Object} object
*/
export const updateCreditCard = async (customerId, creditCard) => {
  const customer = await sequelize.query(
    'CALL customer_update_credit_card (:param1, :param2)', {
      replacements: {
        param1: customerId,
        param2: creditCard
      }
    }
  );
  return customer;
};
