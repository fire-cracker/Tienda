import { sequelize } from '../../model/index';
import { arrayOfObjectExtractor } from '../../utils/index';


/**
* @export
* @function getAllProducts
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getAllProducts = async (req, res) => {
  try {
    const {
      query: {
        description_length: descriptionLength = 200, limit = 20, page = 0
      }
    } = req;

    const [products] = await sequelize.query(
      'CALL catalog_get_products_list (:param1, :param2, :param3)', {
        replacements: { param1: descriptionLength, param2: limit, param3: page },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const [{ products_count: productsCount }] = await sequelize.query(
      'CALL catalog_count_products_list()'
    );

    return res.status(200).send({
      count: productsCount,
      rows: arrayOfObjectExtractor(products)
    });
  } catch (e) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function getCatgoryProduct
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getCatgoryProduct = async (req, res) => {
  try {
    const {
      params: { categoryId },
      query: { description_length: descriptionLength = 200, limit = 20, page = 0 }
    } = req;

    const [products] = await sequelize.query(
      'CALL catalog_get_products_in_category(:param1, :param2, :param3, :param4)', {
        replacements: {
          param1: categoryId, param2: descriptionLength, param3: limit, param4: page
        },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const [{ categories_count: productsCount }] = await sequelize.query(
      `CALL catalog_count_products_in_category(${categoryId})`
    );

    return res.status(200).send({
      count: productsCount,
      rows: arrayOfObjectExtractor(products)
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function getDepartmentProduct
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getDepartmentProduct = async (req, res) => {
  try {
    const {
      params: { departmentId },
      query: { description_length: descriptionLength = 200, limit = 20, page = 0 }
    } = req;

    const [products] = await sequelize.query(
      'CALL catalog_get_products_on_department(:param1, :param2, :param3, :param4)', {
        replacements: {
          param1: departmentId, param2: descriptionLength, param3: limit, param4: page
        },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const [{ products_on_department_count: productsCount }] = await sequelize.query(
      `CALL catalog_count_products_on_department(${departmentId})`
    );

    return res.status(200).send({
      count: productsCount,
      rows: arrayOfObjectExtractor(products)
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function searchProducts
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const searchProducts = async (req, res) => {
  try {
    const {
      query: {
        query_string: queryString, all_words: allWords = 'on', description_length: descriptionLength = 200, limit = 20, page = 0
      }
    } = req;

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
    return res.status(200).send({
      count: productsCount,
      rows: products
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function getProductDetails
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getProductDetails = async (req, res) => {
  try {
    const { params: { productId } } = req;

    const [productDetails] = await sequelize.query(`CALL catalog_get_product_details(${productId})`);

    if (productDetails) {
      return res.status(200).send({
        productDetails
      });
    }
    return res.status(404).send({
      code: 'PRO_01',
      message: 'Product does not exist',
      field: 'Product Id'
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
