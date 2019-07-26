import { sequelize } from '../../model/index';


/**
* @export
* @function getProducts
* @param {Integer} descriptionLength - length of the product description
* @param {Integer} limit - number of product per page
* @param {Integer} page - page number
* @returns {Object} object
*/
export const getProducts = async (descriptionLength, limit, page) => {
  const products = await sequelize.query(
    'CALL catalog_get_products_list (:param1, :param2, :param3)', {
      replacements: { param1: descriptionLength, param2: limit, param3: page },
      type: sequelize.QueryTypes.SELECT
    }
  );

  return products;
};

/**
* @export
* @function allproductsCount
* @param {Integer} categoryId - id of the category
* @param {Integer} departmentId - id of the department
* @returns {Object} object
*/
export const allproductsCount = async (categoryId, departmentId) => {
  let productsCount;
  if (categoryId) {
    [{ categories_count: productsCount }] = await sequelize.query(
      `CALL catalog_count_products_in_category(${categoryId})`
    );
  } else if (departmentId) {
    [{ products_on_department_count: productsCount }] = await sequelize.query(
      `CALL catalog_count_products_on_department(${departmentId})`
    );
  } else {
    [{ products_count: productsCount }] = await sequelize.query(
      'CALL catalog_count_products_list()'
    );
  }
  return productsCount;
};

/**
* @export
* @function categoryProducts
* @param {Integer} categoryId - id of the category
* @param {Integer} descriptionLength - length of the product description
* @param {Integer} limit - number of product per page
* @param {Integer} page - page number
* @returns {Object} object
*/
export const categoryProducts = async (categoryId, descriptionLength, limit, page) => {
  const products = await sequelize.query(
    'CALL catalog_get_products_in_category(:param1, :param2, :param3, :param4)', {
      replacements: {
        param1: categoryId, param2: descriptionLength, param3: limit, param4: page
      },
      type: sequelize.QueryTypes.SELECT
    }
  );

  return products;
};

/**
* @export
* @function departmentProducts
* @param {Integer} departmentId - department id
* @param {Integer} descriptionLength - length of the product description
* @param {Integer} limit - number of product per page
* @param {Integer} page - page number
* @returns {Object} object
*/
export const departmentProducts = async (departmentId, descriptionLength, limit, page) => {
  const products = await sequelize.query(
    'CALL catalog_get_products_on_department(:param1, :param2, :param3, :param4)', {
      replacements: {
        param1: departmentId, param2: descriptionLength, param3: limit, param4: page
      },
      type: sequelize.QueryTypes.SELECT
    }
  );

  return products;
};

/**
* @export
* @function getSearchProducts
* @param {String} queryString - query to search
* @param {String} allWords - 'on' or 'off'
* @param {Integer} descriptionLength - length of the product description
* @param {Integer} limit - number of product per page
* @param {Integer} page - page number
* @returns {Object} object
*/
export const getSearchProducts = async (queryString, allWords, descriptionLength, limit, page) => {
  const products = await sequelize.query('CALL catalog_search(:param1, :param2, :param3, :param4, :param5)', {
    replacements: {
      param1: queryString, param2: allWords, param3: descriptionLength, param4: limit, param5: page
    }
  });

  const [{ 'count(*)': productsCount }] = await sequelize.query(
    'CALL catalog_count_search_result(:param1, :param2)', {
      replacements: {
        param1: queryString, param2: allWords
      }
    }
  );

  return {
    count: productsCount,
    rows: products
  };
};

/**
* @export
* @function getProduct
* @param {Integer} productId - product id
* @returns {Object} object
*/
export const getProduct = async (productId) => {
  const productDetails = await sequelize.query(`CALL catalog_get_product_details(${productId})`);

  return productDetails;
};
