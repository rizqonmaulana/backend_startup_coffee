const connection = require('../config/mysql')

module.exports = {
  getCouponModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM coupon LIMIT ? OFFSET ?',
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCouponByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM coupon WHERE coupon_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCouponByCodeModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM coupon WHERE coupon_code = '${id}'`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCouponActiveModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT coupon_id, coupon.product_id, coupon_code, 
        coupon_discount, coupon_desc, coupon_start_date, 
        coupon_end_date, product.product_name, product.product_pic 
        FROM product JOIN coupon ON coupon.product_id = product.product_id 
        WHERE CURRENT_DATE >= coupon_start_date && CURRENT_DATE <= coupon_end_date`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCouponActiveByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT coupon_id, coupon.product_id, coupon_code, 
        coupon_discount, coupon_desc, coupon_start_date, 
        coupon_end_date, product.product_name, product.product_pic 
        FROM product JOIN coupon ON coupon.product_id = product.product_id 
        WHERE CURRENT_DATE >= coupon_start_date && CURRENT_DATE <= coupon_end_date && coupon_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCouponCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM coupon',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  postCouponModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO coupon SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            coupon_id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  patchCouponModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE coupon SET ? WHERE coupon_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              coupon_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteCouponModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM coupon WHERE coupon_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
