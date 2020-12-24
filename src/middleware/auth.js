const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  isLogin: (request, response, next) => {
    let token = request.headers.authorization
    // proses 1 check apakah headers dimasukkan ?
    if (token) {
      // proses 2 validasi token
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          console.log(error)
          return helper.response(response, 400, error.message)
        } else {
          request.token = result
          next()
        }
      })
    } else {
      return helper.response(response, 400, 'Please login first !')
    }
  },
  isAdmin: (request, response, next) => {
    const userData = request.token

    if (userData.userRole !== 1) {
      return helper.response(response, 400, 'Your are not allowed to access this page')
    } else {
      next()
    }
  }
}
