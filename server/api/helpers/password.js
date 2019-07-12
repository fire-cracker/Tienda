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
