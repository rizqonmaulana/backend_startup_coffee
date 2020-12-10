const { getProductByCategoryModel } = require('../model/m_category')
const helper = require('../helper/response')

module.exports = {
  getProductByCategory: async (request, response) => {
    try {
      const { categoryName } = request.params
      const result = await getProductByCategoryModel(categoryName)
      return helper.response(
        response,
        200,
        `Success get product by category : ${categoryName}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
