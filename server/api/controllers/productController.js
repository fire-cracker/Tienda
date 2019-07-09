import sequelize from '../../model/index';
import { arrayOfObjectExtractor } from '../../utils/index';

const db = sequelize;

/**
* @export
* @function getAllProducts
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getAllProducts = async (req, res) => {
  const { query: { description_length: descriptionLength = 200, limit = 20, page = 0 } } = req;
  try {
    const [products] = await db.query('CALL catalog_get_products_list (:param1, :param2, :param3)', {
      replacements: { param1: descriptionLength, param2: limit, param3: page },
      attributes: { exclude: 'description' },
      type: sequelize.QueryTypes.SELECT
    });

    const [{ products_count: productsCount }] = await db.query('CALL catalog_count_products_list()');

    return res.status(200).send({
      count: productsCount,
      rows: arrayOfObjectExtractor(products),
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Internal server error'
    });
  }
};
