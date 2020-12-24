const redis = require('redis')
const helper = require('../helper/response')
const client = redis.createClient()

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success Get Product By Id',
          JSON.parse(result)
        )
      } else {
        console.log('data ada didalam redis')
        next()
      }
    })
  },
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log('data ada didalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            response,
            200,
            'Success Get Product',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          console.log('data bukan dari redis')
          next()
        }
      }
    )
  },
  clearDataProductRedis: (_request, _response, next) => {
    client.keys('getproduct*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  }
}
