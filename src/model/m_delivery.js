const connection = require('../config/mysql')

module.exports = {
  postDeliveryModel: (setDataDelivery) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO delivery SET ?',
        setDataDelivery,
        (error, result) => {
          if (!error) {
            const newResult = {
              delivery_id: result.insertId,
              ...setDataDelivery
            }
            // console.log(newResult)
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchDeliveryModel: (setDataDelivery, getDeliveryId) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          'UPDATE delivery SET ? WHERE delivery_id = ?',
          [setDataDelivery, getDeliveryId],
          (error, result) => {
            if (!error) {
              const newResult = {
                delivery_id: getDeliveryId,
                ...setDataDelivery
              }
              resolve(newResult)
            } else {
              reject(new Error(error))
            }
          }
        )
      )
    })
  }
}
