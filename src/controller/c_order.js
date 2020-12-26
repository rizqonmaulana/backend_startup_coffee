const {
  getOrderByUserIdModel,
  getOrderByInvoiceModel,
  postOrderModel,
  deleteOrderModel,
  getOrderDetailHistoryModel
} = require('../model/m_order')
const {
  postOrderDetailModel,
  deleteOrderDetailModel
} = require('../model/m_order_detail')
const { getCouponByCodeModel } = require('../model/m_coupon')
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
  postOrder: async (request, response) => {
    try {
      const data = request.body
      let i
      let result
      let getDiscountPromo
      let getStartPromo
      let getEndPromo
      let afterDiscount
      let discount

      for (i = 0; i < data.length; i++) {
        if (i === 0) {
          const {
            orderPaymentMethod,
            orderTotal,
            customerId,
            promoCode
          } = data[0]

          const dateNow = new Date()
          const getInvoice =
            Math.random() * (9999999999 - 100000000) + 100000000
          const orderInvoice = Math.ceil(getInvoice)
          console.log(orderInvoice)

          // is promo code valid ?
          if (promoCode) {
            const getCouponData = await getCouponByCodeModel(promoCode)
            if (getCouponData.length > 0) {
              getDiscountPromo = getCouponData[0].coupon_discount
              getStartPromo = getCouponData[0].coupon_start_date
              getEndPromo = getCouponData[0].coupon_end_date

              if (dateNow >= getStartPromo && dateNow <= getEndPromo) {
                discount = (orderTotal * getDiscountPromo) / 100
                afterDiscount = orderTotal - discount
              } else {
                afterDiscount = orderTotal
              }
            } else {
              afterDiscount = orderTotal
            }
          } else {
            afterDiscount = orderTotal
          }

          const setData = {
            order_invoice: orderInvoice,
            order_payment_method: orderPaymentMethod,
            order_total: afterDiscount,
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

          // get discount ?
          if (discount) {
            discount = (orderDetailPrice * getDiscountPromo) / 100
            afterDiscount = orderDetailPrice - discount
          } else {
            afterDiscount = orderDetailPrice
          }

          const setDataOrderDetail = {
            order_id: result.order_id,
            product_id: productId,
            order_detail_delivery: orderDetailDelivery,
            order_detail_size: orderDetailSize,
            order_detail_qty: orderDetailQty,
            order_detail_price: afterDiscount
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
