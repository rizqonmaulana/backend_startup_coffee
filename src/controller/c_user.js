const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')

const {
  registerUserModel,
  checkEmailModel,
  updateUserModel,
  updatePasswordModel,
  getUserModel
} = require('../model/m_user')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const {
        userName,
        userEmail,
        userPassword,
        userPhone,
        userAddress,
        userFirstName,
        userLastName,
        userDob,
        userGender
      } = request.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_pic: request.file === undefined ? '' : request.file.filename,
        user_password: encryptPassword,
        user_role: 0,
        user_phone: userPhone,
        user_address: userAddress,
        user_first_name: userFirstName,
        user_last_name: userLastName,
        user_dob: userDob,
        user_gender: userGender,
        user_created_at: new Date()
      }

      //   cek apakah email sudah terdaftar ?
      const checkDuplicateEmail = await checkEmailModel(userEmail)

      if (checkDuplicateEmail.length > 0) {
        return helper.response(
          response,
          400,
          'Duplicate Email, email has been used by another account'
        )
      }

      const result = await registerUserModel(setData)

      return helper.response(response, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getUser: async (request, response) => {
    try {
      const { email } = request.params
      const result = await getUserModel(email)
      client.setex(`getuser:${email}`, 3600, JSON.stringify(result))
      return helper.response(response, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updatePassword: async (request, response) => {
    try {
      console.log('masuk controller')
      const { email } = request.params
      const { userPassword } = request.body

      console.log('ini email => ' + email)
      console.log('ini password => ' + userPassword)

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const getEmail = await getUserModel(email)

      if (getEmail.length > 0) {
        console.log('masuk if controller')
        const result = await updatePasswordModel(encryptPassword, email)
        return helper.response(
          response,
          200,
          `Success updated password ${email}`,
          result
        )
      } else {
        return helper.response(response, 400, 'email tidak ada')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updateUser: async (request, response) => {
    try {
      const { email } = request.params

      const {
        userName,
        userPhone,
        userAddress,
        userFirstName,
        userLastName,
        userDob,
        userGender
      } = request.body

      let newPic
      const user = await getUserModel(email)

      if (request.file === undefined) {
        newPic = user[0].user_pic
      } else {
        newPic = request.file.filename
        fs.unlink(`./uploads/${user[0].user_pic}`, function (err) {
          if (err) throw err
          console.log('File deleted!')
        })
      }

      const setData = {
        user_name: userName,
        user_pic: newPic,
        user_phone: userPhone,
        user_address: userAddress,
        user_first_name: userFirstName,
        user_last_name: userLastName,
        user_dob: userDob,
        user_gender: userGender,
        user_updated_at: new Date()
      }

      const result = await updateUserModel(setData, email)

      return helper.response(
        response,
        200,
        `Success Update user ${email}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { userEmail, userPassword } = request.body
      // proses 1 : apakah email ada di db ?
      const checkUserData = await checkEmailModel(userEmail)

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
            user_email: userEmail,
            user_role: userRole
          } = checkUserData[0]

          const payload = {
            userId,
            userName,
            userEmail,
            userRole
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
