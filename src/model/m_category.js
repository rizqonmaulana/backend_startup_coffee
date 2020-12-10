const connection = require('../config/mysql')

module.exports = {
  getProductByCategoryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product JOIN category ON product.category_id = category.category_id WHERE product.category_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
