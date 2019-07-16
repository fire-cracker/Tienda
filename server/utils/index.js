/**
* @export
* @function arrayOfObjectExtractor
* @param {Object} model - request received
* @returns {array} - returns an array of objects
*/
export const arrayOfObjectExtractor = (model) => {
  return Object.keys(model).map(key => model[key]);
};

/**
* @export
* @function maskString
* @param {String} str - request received
* @param {Integer} numOfUnmaskedString - length of string to leave unmasked
* @returns {String} - returns a string with masked characters except the last 4
*/
export const maskString = (str, numOfUnmaskedString) => {
  return new Array(str.length - numOfUnmaskedString + 1).join('x') + str.slice(-numOfUnmaskedString);
};
