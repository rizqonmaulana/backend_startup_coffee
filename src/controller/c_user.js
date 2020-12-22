const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

const { registerUserModel, checkEmailModel } = require('../model/m_user')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const { userName, userEmail, userPassword } = request.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword,
        user_created_at: new Date()
      }

      //   cek apakah email sudah terdaftar ?

      const result = await registerUserModel(setData)

      return helper.response(response, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { userEmail, userPassword } = request.body
      // proses 1 : apakah email ada di db ?
      const checkUserData = await checkEmailModel(userEmail)
      console.log(checkUserData)

      if (checkUserData.length > 0) {
        // proses 2 : apakah password benar ?
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkUserData[0].user_password
        )

        if (checkPassword) {
          // proses 3 : set JWT
          //   nama column db : convert to camelCase (for standard js)
          const {
            user_id: userId,
            user_name: userName,
            user_email: userEmail
          } = checkUserData[0]

          const payload = {
            userId,
            userName,
            userEmail
          }

          const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '3h' })
          const result = { ...payload, token }
          return helper.response(response, 200, 'Login Success', result)
        } else {
          return helper.response(response, 400, 'Password invalid')
        }
      } else {
        return helper.response(response, 400, 'Account not Registered')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
