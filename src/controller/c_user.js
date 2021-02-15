const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')
const nodemailer = require('nodemailer')

const {
  registerUserModel,
  checkEmailModel,
  updateUserModel,
  updatePasswordModel,
  getUserModel,
  activateUser,
  forgotPassword,
  resetPassword
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

      const crypto = require('crypto')
      const userKey = crypto.randomBytes(20).toString('hex')

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_pic: request.file === undefined ? '' : request.file.filename,
        user_password: encryptPassword,
        user_role: 0,
        user_key: userKey,
        user_phone: userPhone,
        user_address: userAddress,
        user_first_name: userFirstName,
        user_last_name: userLastName,
        user_dob: userDob,
        user_gender: userGender,
        user_created_at: new Date()
      }

      const checkDuplicateEmail = await checkEmailModel(userEmail)

      if (checkDuplicateEmail.length > 0) {
        return helper.response(
          response,
          400,
          'Duplicate Email, email has been used by another account'
        )
      }

      const result = await registerUserModel(setData)
      if (result) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'kostkost169@gmail.com', // generated ethereal user
            pass: 'admin@123456' // generated ethereal password
          }
        })
        const mailOptions = {
          from: '"startup coffee" <startup coffee@gmail.com', // sender address
          to: userEmail, // list of receivers
          subject: 'startup coffee - Activate account', // Subject line
          html: `<p>To Account  </p>
          <p>Click link bellow to activate your account</p>
          <a href="${process.env.URL}/active/${userKey}">Activate my account</a>`
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(response, 400, 'Email not send !')
          } else {
            console.log(info)
            return helper.response(response, 200, 'Email has been send !')
          }
        })
      }

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
      const checkUserData = await checkEmailModel(userEmail)

      if (checkUserData.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkUserData[0].user_password
        )

        if (checkPassword) {
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

          const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '24h' })
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
  },
  activateUser: async (request, response) => {
    try {
      const { key } = request.body
      console.log(key)
      console.log('ini key')

      const result = await activateUser(key)

      return helper.response(response, 200, 'Account has been active ', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { email } = request.body

      const emailCheck = await checkEmailModel(email)

      if (emailCheck.length < 1) {
        return helper.response(response, 400, 'Account not found')
      }

      const crypto = require('crypto')
      const key = crypto.randomBytes(20).toString('hex')

      const result = await forgotPassword(key, email)

      if (result) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'kostkost169@gmail.com', // generated ethereal user
            pass: 'admin@123456' // generated ethereal password
          }
        })
        const mailOptions = {
          from: '"startup coffee" <startup coffee@gmail.com', // sender address
          to: email, // list of receivers
          subject: 'startup coffee - Forgot password', // Subject line
          html: `<p>To Account  </p>
          <p>Click link bellow to reset your password</p>
          <a href="${process.env.URL}/forgot?key=${key}">Activate my account</a>`
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(response, 400, 'Email not send !')
          } else {
            console.log(info)
            return helper.response(response, 200, 'Email has been send !')
          }
        })
      }

      return helper.response(
        response,
        200,
        'Please check your email to reset your password ',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  resetPassword: async (request, response) => {
    try {
      const { password, confirmPassword, key } = request.body

      if (password !== confirmPassword) {
        return helper.response(response, 400, 'Password not match')
      }

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(password, salt)

      const result = await resetPassword(encryptPassword, key)

      return helper.response(
        response,
        200,
        'Your password has been updated ',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
