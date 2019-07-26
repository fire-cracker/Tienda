import { arrayOfObjectExtractor } from '../../utils/index';
import {
  getProducts, categoryProducts, allproductsCount, departmentProducts,
  getSearchProducts, getProduct
} from '../services/productService';


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

    const [products] = await getProducts(descriptionLength, limit, page);

    const productsCount = await allproductsCount();

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
* @function getCategoryProduct
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getCategoryProducts = async (req, res) => {
  try {
    const {
      params: { categoryId },
      query: { description_length: descriptionLength = 200, limit = 20, page = 0 }
    } = req;

    const [products] = await categoryProducts(categoryId, descriptionLength, limit, page);

    const productsCount = await allproductsCount(categoryId);

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
export const getDepartmentProducts = async (req, res) => {
  try {
    const {
      params: { departmentId },
      query: { description_length: descriptionLength = 200, limit = 20, page = 0 }
    } = req;

    const [products] = await departmentProducts(departmentId, descriptionLength, limit, page);

    const productsCount = await allproductsCount(null, departmentId);

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

    const products = await getSearchProducts(queryString, allWords, descriptionLength, limit, page);

    return res.status(200).send(products);
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

    const [productDetails] = await getProduct(productId);

    if (productDetails) {
      return res.status(200).send(productDetails);
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
