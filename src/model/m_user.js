const connection = require('../config/mysql')

module.exports = {
  registerUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertedId,
            ...setData
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  updateUserModel: (setData, userEmail) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          'UPDATE user SET ? WHERE user_email = ?',
          setData,
          userEmail,
          (error, result) => {
            if (!error) {
              console.log(result)
              console.log(error)
              resolve(result)
            } else {
              console.log(result)
              console.log(error)
              reject(new Error(error))
            }
          }
        )
      )
    })
  },
  checkEmailModel: (userEmail) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_id, user_name, user_email, user_password, user_role FROM user WHERE user_email = ?',
        userEmail,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
