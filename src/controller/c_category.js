const {
  getProductByCategoryModel,
  getProductByCategorySearchModel,
  getCategoryCountModel,
  getCategorySearchCountModel
} = require('../model/m_category')
const helper = require('../helper/response')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getProductByCategory: async (request, response) => {
    try {
      const { categoryName } = request.params
      let { search, sortBy, sortType, page, limit } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      let totalData
      if (search) {
        totalData = await getCategorySearchCountModel(categoryName, search)
      } else {
        totalData = await getCategoryCountModel(categoryName)
      }
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null // page=...&limit=...

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink:
          nextLink &&
          `http://localhost:3000/category/${categoryName}?${nextLink}`,
        prevLink:
          prevLink &&
          `http://localhost:3000/category/${categoryName}?${prevLink}`
      }

      let result
      if (search && sortBy && sortType) {
        result = await getProductByCategorySearchModel(
          categoryName,
          search,
          sortBy,
          sortType,
          limit,
          offset
        )
      } else {
        result = await getProductByCategoryModel(
          categoryName,
          sortBy,
          sortType,
          limit,
          offset
        )
      }

      // redis
      const newData = {
        result,
        pageInfo
      }
      client.setex(
        `getproductbycategory:${categoryName}${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(newData)
      )

      return helper.response(
        response,
        200,
        `Success get product by category : ${categoryName}`,
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
