const connection = require('../config/mysql')

module.exports = {
  getOrderModel: (customerId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE customer_id = ${customerId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderDetailModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT order_invoice, order_payment_method, order_total, 
          customer_id, product_name, order_detail_delivery, order_detail_size, 
          order_detail_qty, order_detail_price, order_created_at FROM orders 
          JOIN order_detail ON orders.order_id = order_detail.order_id JOIN 
          product ON order_detail.product_id = product.product_id 
          WHERE order_invoice = '${invoice}'`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postOrderModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO orders SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            order_id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteOrderModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM orders WHERE order_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
