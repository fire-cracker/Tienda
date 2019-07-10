/**
* @export
* @function arrayOfObjectExtractor
* @param {Object} model - request received
* @returns {array} - returns an array of objects
*/
export const arrayOfObjectExtractor = (model) => {
  return Object.keys(model).map(key => model[key]);
};
