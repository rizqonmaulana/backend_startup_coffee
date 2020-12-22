const connection = require('../config/mysql')

module.exports = {
  postOrderDetailModel: (setDataOrderDetail) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO order_detail SET ?',
        setDataOrderDetail,
        (error, result) => {
          if (!error) {
            const newResult = {
              order_detail_id: result.insertId,
              ...setDataOrderDetail
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteOrderDetailModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM order_detail WHERE order_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteOrderDetailByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM order_detail WHERE order_detail_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
