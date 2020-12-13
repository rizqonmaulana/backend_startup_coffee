const {
  getOrderModel,
  getOrderDetailModel,
  postOrderModel,
  deleteOrderModel
} = require('../model/m_order')
const {
  postOrderDetailModel,
  deleteOrderDetailModel
} = require('../model/m_order_detail')
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
      const data = request.body
      let i
      let result

      for (i = 0; i < data.length; i++) {
        if (i === 0) {
          const {
            orderInvoice,
            orderPaymentMethod,
            orderTotal,
            customerId
          } = data[0]

          const setData = {
            order_invoice: orderInvoice,
            order_payment_method: orderPaymentMethod,
            order_total: orderTotal,
            customer_id: customerId
          }

          result = await postOrderModel(setData)
        } else {
          const {
            productId,
            orderDetailDelivery,
            orderDetailSize,
            orderDetailQty,
            orderDetailPrice
          } = data[i]

          const setDataOrderDetail = {
            order_id: result.order_id,
            product_id: productId,
            order_detail_delivery: orderDetailDelivery,
            order_detail_size: orderDetailSize,
            order_detail_qty: orderDetailQty,
            order_detail_price: orderDetailPrice
          }

          await postOrderDetailModel(setDataOrderDetail)
        }
      }

      return helper.response(response, 200, 'Success post order', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteOrder: async (request, response) => {
    try {
      const { id } = request.params
      await deleteOrderDetailModel(id)
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
  },
  getOrderDetail: async (request, response) => {
    try {
      const { invoice } = request.params
      console.log(invoice)
      const result = await getOrderDetailModel(invoice)

      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success get order by invoice : ${invoice}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Order by invoice : ${invoice} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
