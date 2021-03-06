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
        `SELECT * FROM orders JOIN user ON orders.customer_id = user.user_id WHERE orders.customer_id = ${customerId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderAdminModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT  orders.*, user.user_name, user.user_address, user.user_phone FROM orders JOIN user ON orders.customer_id = user.user_id WHERE order_status = 0',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderDetailAdminModel: (orderId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product.product_name, product.product_pic FROM orders JOIN order_detail ON orders.order_id = order_detail.order_id JOIN product ON order_detail.product_id = product.product_id WHERE orders.order_id = ${orderId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderYearIncomeModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(order_total) AS total_price FROM orders WHERE YEAR(order_created_at) = YEAR(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderWeekCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(order_id) AS weekOrder FROM orders WHERE YEARWEEK(order_created_at) = YEARWEEK(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getOrderDailyIncomeModel: (dateNow) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(order_total) AS total_price FROM orders WHERE order_created_at LIKE '%${dateNow}%'`,
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
  },
  getChartData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(order_total) AS total FROM orders WHERE YEAR(order_created_at) = YEAR(NOW()) GROUP BY MONTH(order_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
