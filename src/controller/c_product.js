const {
  getProductModel,
  getProductCountModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel
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
        category_id,
        product_name,
        product_price,
        product_status
      } = request.body
      const setData = {
        category_id,
        product_name,
        product_price,
        product_created_at: new Date(),
        product_status
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
        category_id,
        product_name,
        product_price,
        product_status
      } = request.body
      // disini kondisi validation
      const setData = {
        category_id,
        product_name,
        product_price,
        product_updated_at: new Date(),
        product_status
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchProductModel(setData, id)
        console.log(result)
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
