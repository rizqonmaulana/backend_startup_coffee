const {
  getOrderByUserIdModel,
  getOrderByInvoiceModel,
  getOrderAdminModel,
  getOrderYearIncomeModel,
  postOrderModel,
  patchOrderModel,
  deleteOrderModel,
  getOrderDetailHistoryModel
} = require('../model/m_order')
const {
  postOrderDetailModel,
  deleteOrderDetailModel
} = require('../model/m_order_detail')
const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getOrderByUserId: async (request, response) => {
    try {
      const { customerId } = request.params
      const result = await getOrderByUserIdModel(customerId)
      console.log(result)

      if (result.length > 0) {
        client.setex(`getorderuser:${customerId}`, 3600, JSON.stringify(result))
        return helper.response(
          response,
          200,
          'Success get order history',
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Order history by customer id : ${customerId} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getOrderByInvoice: async (request, response) => {
    try {
      const { invoice } = request.params
      console.log(invoice)
      const result = await getOrderByInvoiceModel(invoice)

      if (result.length > 0) {
        client.setex(
          `getorderbyinvoice:${invoice}`,
          3600,
          JSON.stringify(result)
        )
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
  },
  getOrderDetailHistory: async (request, response) => {
    try {
      const { customerId } = request.params
      const result = await getOrderDetailHistoryModel(customerId)

      if (result.length > 0) {
        client.setex(
          `getorderdetailbyuserid:${customerId}`,
          3600,
          JSON.stringify(result)
        )

        return helper.response(
          response,
          200,
          `Success get history by user id : ${customerId}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Order history by user id : ${customerId} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getOrderAdmin: async (_request, response) => {
    try {
      const result = await getOrderAdminModel()
      return helper.response(
        response,
        200,
        'Success get order for admin',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getOrderYearIncome: async (_request, response) => {
    try {
      const result = await getOrderYearIncomeModel()
      return helper.response(
        response,
        200,
        'Success get order year income',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postOrder: async (request, response) => {
    try {
      const data = request.body
      let result

      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          const { orderPaymentMethod, orderTotal, customerId } = data[0]

          const getInvoice =
            Math.random() * (9999999999 - 100000000) + 100000000
          const orderInvoice = Math.ceil(getInvoice)

          const setData = {
            order_invoice: orderInvoice,
            order_payment_method: orderPaymentMethod,
            order_total: orderTotal,
            order_status: 0,
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
  patchOrder: async (request, response) => {
    try {
      const { invoice } = request.body
      console.log(invoice)
      const result = await patchOrderModel(invoice)
      return helper.response(
        response,
        200,
        'Success update order status',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteOrder: async (request, response) => {
    try {
      const { invoice } = request.params
      const checkInvoice = await getOrderByInvoiceModel(invoice)
      if (checkInvoice.length > 0) {
        const orderId = checkInvoice[0].order_id
        console.log(orderId)
        const result = await deleteOrderModel(invoice)
        await deleteOrderDetailModel(orderId)
        return helper.response(
          response,
          200,
          `Success delete order by invoice : ${invoice}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Product By Id : ${invoice} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
