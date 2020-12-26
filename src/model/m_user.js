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
  getUserModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id, user_name, user_email, 
        user_phone, user_address, user_first_name, 
        user_last_name, user_dob, user_gender FROM 
        user WHERE user_email = '${email}'`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  updatePasswordModel: (password, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET user_password = '${password}' WHERE user_email = '${email}'`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  updateUserModel: (setData, email) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          'UPDATE user SET ? WHERE user_email = ?',
          [setData, email],
          (error, result) => {
            if (!error) {
              resolve(setData)
            } else {
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
