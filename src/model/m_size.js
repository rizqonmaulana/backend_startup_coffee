const connection = require('../config/mysql')

module.exports = {
  postSizeModel: (setDataSize) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO size SET ?',
        setDataSize,
        (error, result) => {
          if (!error) {
            const newResult = {
              size_id: result.insertId,
              ...setDataSize
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
  patchSizeModel: (setDataSize, getSizeId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE size SET ? WHERE size_id = ?',
        [setDataSize, getSizeId],
        (error, result) => {
          if (!error) {
            const newResult = {
              size_id: getSizeId,
              ...setDataSize
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
