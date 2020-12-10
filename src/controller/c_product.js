const {
  getProductModel,
  getProductCountModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel
} = require('../model/m_product')
const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { page, limit } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getProductCountModel()
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

      console.log(request.query)
      console.log(qs.stringify(request.query))

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/product?${prevLink}`
      }

      const result = await getProductModel(limit, offset)
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
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success Get Product By Id ${id}`,
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        productName,
        productPrice,
        productPic,
        productDesc,
        productStartHour,
        productEndHour,
        productQty,
        categoryId,
        promoId,
        sizeId,
        deliveryId
      } = request.body
      const setData = {
        product_name: productName,
        product_price: productPrice,
        product_pic: productPic,
        product_desc: productDesc,
        product_start_hour: productStartHour,
        product_end_hour: productEndHour,
        product_qty: productQty,
        category_id: categoryId,
        promo_id: promoId,
        size_id: sizeId,
        delivery_id: deliveryId,
        product_created_at: new Date()
      }
      const result = await postProductModel(setData)

      return helper.response(response, 200, 'Success Post Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        productName,
        productPrice,
        productPic,
        productDesc,
        productStartHour,
        productEndHour,
        productQty,
        categoryId,
        promoId,
        sizeId,
        deliveryId
      } = request.body
      // disini kondisi validation
      const setData = {
        product_name: productName,
        product_price: productPrice,
        product_pic: productPic,
        product_desc: productDesc,
        product_start_hour: productStartHour,
        product_end_hour: productEndHour,
        product_qty: productQty,
        category_id: categoryId,
        promo_id: promoId,
        size_id: sizeId,
        delivery_id: deliveryId,
        product_updated_at: new Date()
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchProductModel(setData, id)
        return helper.response(response, 200, 'Success Post Product', result)
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteProductModel(id)
      return helper.response(
        response,
        200,
        `Success Delete Product by id : ${id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
