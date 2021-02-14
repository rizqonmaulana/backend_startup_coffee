const connection = require('../config/mysql')

module.exports = {
  getProductByCategoryModel: (
    categoryName,
    sortBy,
    sortType,
    limit,
    offset
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product JOIN category ON product.category_id = category.category_id WHERE category.category_name = '${categoryName}' ORDER BY ${sortBy} ${sortType} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getProductByCategorySearchModel: (
    categoryName,
    search,
    sortBy,
    sortType,
    limit,
    offset
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product JOIN category ON product.category_id = category.category_id WHERE category.category_name = '${categoryName}' AND product.product_name LIKE '%${search}%' ORDER BY ${sortBy} ${sortType} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCategoryCountModel: (categoryName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM category JOIN product on category.category_id = product.category_id WHERE category_name = '${categoryName}'`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getCategorySearchCountModel: (categoryName, search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM category JOIN product on category.category_id = product.category_id WHERE category_name = '${categoryName}' AND product_name LIKE '%${search}%'`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
