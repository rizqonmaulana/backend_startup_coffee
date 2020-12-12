const {
  getOrderModel,
  postOrderModel,
  deleteOrderModel
} = require('../model/m_order')
const helper = require('../helper/response')

module.exports = {
  getOrder: async (request, response) => {
    try {
      const { customerId } = request.params
      const result = await getOrderModel(customerId)
      return helper.response(response, 200, 'Success get order history', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postOrder: async (request, response) => {
    try {
      const {
        orderInvoice,
        orderPaymentMethod,
        orderTotal,
        customerId
      } = request.body
      const setData = {
        order_invoice: orderInvoice,
        order_payment_method: orderPaymentMethod,
        order_total: orderTotal,
        customer_id: customerId
      }

      const result = await postOrderModel(setData)
      return helper.response(response, 200, 'Success post order', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteOrder: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteOrderModel(id)
      return helper.response(
        response,
        200,
        `Success delete order by id : ${id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
  //   getOrder: async (request, response) => {
  //     try {
  //       const { invoice } = request.params
  //       const result = await getOrderModel(invoice)
  //       return helper.response(
  //         response,
  //         200,
  //         `Success get order by invoice : ${invoice}`,
  //         result
  //       )
  //     } catch (error) {
  //         return helper.response(response, 400, 'Bad Request', error)
  //     }
  //   }
}
