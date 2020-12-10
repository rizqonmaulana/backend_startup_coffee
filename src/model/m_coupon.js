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
            coupon_id: result.insertedId,
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
            console.log(newResult)
            resolve(newResult)
          } else {
            reject(new Error(error))
            console.log(result)
            console.log(error)
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
