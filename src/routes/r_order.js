const router = require('express').Router()
const {
  getOrder,
  getOrderDetail,
  postOrder,
  deleteOrder
} = require('../controller/c_order')

router.get('/:customerId', getOrder)
router.get('/invoice/:invoice', getOrderDetail)
router.post('/', postOrder)
router.delete('/:id', deleteOrder)

module.exports = router
