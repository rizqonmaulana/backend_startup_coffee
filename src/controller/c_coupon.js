const {
  getCouponModel,
  getCouponByIdModel,
  getCouponCountModel,
  getCouponActiveModel,
  getCouponActiveByIdModel,
  postCouponModel,
  patchCouponModel,
  deleteCouponModel
} = require('../model/m_coupon')
const helper = require('../helper/response')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getCoupon: async (request, response) => {
    try {
      let { page, limit } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getCouponCountModel()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null

      console.log(qs.stringify(request.query))

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/coupon?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/coupon?${prevLink}`
      }

      const result = await getCouponModel(limit, offset)

      // redis
      const newData = {
        result,
        pageInfo
      }
      client.setex(
        `getcoupon:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(newData)
      )

      return helper.response(
        response,
        200,
        'Success get product',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCouponById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCouponByIdModel(id)
      if (result.length > 0) {
        client.setex(`getcouponbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(
          response,
          200,
          `Success Get Coupon By Id ${id}`,
          result
        )
      } else {
        return helper.response(response, 404, `Coupon By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCouponActive: async (_request, response) => {
    try {
      const result = await getCouponActiveModel()
      client.setex('getcouponactive', 3600, JSON.stringify(result))
      return helper.response(response, 200, 'Success get active coupon', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCouponActiveById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCouponActiveByIdModel(id)
      client.setex('getcouponactivebyid', 3600, JSON.stringify(result))
      return helper.response(
        response,
        200,
        `Success get active coupon by id ${id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postCoupon: async (request, response) => {
    try {
      const {
        productId,
        couponCode,
        couponDiscount,
        couponDesc,
        couponStartDate,
        couponEndDate
      } = request.body

      const setData = {
        product_id: productId,
        coupon_code: couponCode,
        coupon_discount: couponDiscount,
        coupon_desc: couponDesc,
        coupon_start_date: couponStartDate,
        coupon_end_date: couponEndDate,
        coupon_created_at: new Date()
      }

      const result = await postCouponModel(setData)

      return helper.response(response, 200, 'Success post coupon', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchCoupon: async (request, response) => {
    try {
      const { id } = request.params
      const {
        productId,
        couponCode,
        couponDiscount,
        couponDesc,
        couponStartDate,
        couponEndDate
      } = request.body

      const setData = {
        product_id: productId,
        coupon_code: couponCode,
        coupon_discount: couponDiscount,
        coupon_desc: couponDesc,
        coupon_start_date: couponStartDate,
        coupon_end_date: couponEndDate,
        coupon_updated_at: new Date()
      }

      const checkId = await getCouponByIdModel(id)

      if (checkId.length > 0) {
        const result = await patchCouponModel(setData, id)
        return helper.response(response, 200, 'Success patch coupon', result)
      } else {
        return helper.response(response, 404, `Coupon By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteCoupon: async (request, response) => {
    try {
      const { id } = request.params

      const checkId = await getCouponByIdModel(id)

      if (checkId.length > 0) {
        const result = await deleteCouponModel(id)
        return helper.response(
          response,
          200,
          `Success delete coupon by id : ${id}`,
          result
        )
      } else {
        return helper.response(response, 404, `Coupon By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
