import bcrypt from 'bcrypt';

/**
* @export
* @function hashPassword
* @param {String} password - request received
* @returns {String} - returns an hashed passoword
*/
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

/**
* @export
* @function passwordMatch
* @param {String} password - request received
*@param {string} hashedPassword - request received
* @returns {Boolean} - returns true or false
*/
export const passwordMatch = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
