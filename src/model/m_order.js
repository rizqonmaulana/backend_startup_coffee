const connection = require('../config/mysql')

module.exports = {
  getOrderByUserIdModel: (customerId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE customer_id = ${customerId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderByInvoiceModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT orders.order_id, order_invoice, order_payment_method, order_total, 
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
  getOrderDetailHistoryModel: (customerId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT orders.order_id, product.product_id, order_detail.order_detail_id, 
        order_detail.order_detail_id, product.product_id, product_name, product_pic, 
        order_detail.order_detail_qty, order_detail.order_detail_price, 
        order_invoice FROM product JOIN order_detail ON product.product_id=order_detail.product_id 
        JOIN orders ON order_detail.order_id=orders.order_id WHERE orders.customer_id = ${customerId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderAdminModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM orders WHERE order_status = 0',
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
  patchOrderModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE orders SET order_status = 1 WHERE order_invoice = ${invoice}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteOrderModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM orders WHERE order_invoice = ${invoice}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
