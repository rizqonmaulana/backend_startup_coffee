const connection = require('../config/mysql')

module.exports = {
  getProductByCategoryModel: (categoryName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product JOIN category ON product.category_id = category.category_id WHERE category.category_name = '${categoryName}'`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
