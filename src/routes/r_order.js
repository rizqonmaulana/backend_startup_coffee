const router = require('express').Router()
const {
  getOrder,
  getOrderDetail,
  getOrderHistory,
  postOrder,
  deleteOrder,
  deleteOrderDetailById
} = require('../controller/c_order')

router.get('/:customerId', getOrder)
router.get('/invoice/:invoice', getOrderDetail)
router.get('/history/:customerId', getOrderHistory)
router.post('/', postOrder)
router.delete('/:id', deleteOrder)
router.delete('/history/:id', deleteOrderDetailById)

module.exports = router
