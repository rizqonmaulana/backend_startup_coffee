const {
  getCouponModel,
  getCouponByIdModel,
  getCouponCountModel,
  postCouponModel,
  patchCouponModel,
  deleteCouponModel
} = require('../model/m_coupon')
const helper = require('../helper/response')
const qs = require('querystring')

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
  postCoupon: async (request, response) => {
    try {
      const {
        couponCode,
        couponDiscount,
        couponStartDate,
        couponEndDate
      } = request.body

      const setData = {
        coupon_code: couponCode,
        coupon_discount: couponDiscount,
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
        couponCode,
        couponDiscount,
        couponStartDate,
        couponEndDate
      } = request.body

      const setData = {
        coupon_code: couponCode,
        coupon_discount: couponDiscount,
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
