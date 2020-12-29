const redis = require('redis')
const helper = require('../helper/response')
const client = redis.createClient()

module.exports = {
  // PRODUCT
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get product by id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
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
            'Success get product',
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
  getProductDetaildRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductdetail:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get product detail',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
        next()
      }
    })
  },
  getProductByCategoryRedis: (request, response, next) => {
    const { categoryName } = request.params
    client.get(
      `getproductbycategory:${categoryName}${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log('data ada didalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            response,
            200,
            'Success get product by category',
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
  },

  // USER
  getUserRedis: (request, response, next) => {
    const { email } = request.params
    client.get(`getuser:${email}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        const newResult = JSON.parse(result)
        return helper.response(response, 200, 'Success Get User', newResult)
      } else {
        console.log('data bukan dari redis')
        next()
      }
    })
  },
  clearUserRedis: (request, _response, next) => {
    const { email } = request.params
    client.keys(`getuser:${email}`, (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },

  // COUPON
  getCouponRedis: (request, response, next) => {
    client.get(
      `getcoupon:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log('data ada didalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            response,
            200,
            'Success get Coupon',
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
  getCouponByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getcouponbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get coupon by id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
        next()
      }
    })
  },
  getCouponActiveRedis: (_request, response, next) => {
    client.get('getcouponactive', (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get active coupon',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
        next()
      }
    })
  },
  clearCouponRedis: (request, _response, next) => {
    client.keys('getcoupon*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },

  // ORDER / HISTORY
  getOrderByUserIdRedis: (request, response, next) => {
    const { customerId } = request.params
    client.get(`getorderuser:${customerId}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get order history',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
        next()
      }
    })
  },
  getOrderDetailByUserIdRedis: (request, response, next) => {
    const { customerId } = request.params
    client.get(`getorderdetailbyuserid:${customerId}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get order history',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
        next()
      }
    })
  },
  getOrderByInvoiceRedis: (request, response, next) => {
    const { invoice } = request.params
    client.get(`getorderbyinvoice:${invoice}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get order by invoice',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
        next()
      }
    })
  },
  clearOrderByIdRedis: (request, _response, next) => {
    client.keys('getorder*', (_error, result) => {
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
