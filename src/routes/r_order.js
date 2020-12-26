const router = require('express').Router()
const {
  getOrderByUserId,
  getOrderByInvoice,
  getOrderDetailHistory,
  postOrder,
  deleteOrder
} = require('../controller/c_order')
const { isLogin } = require('../middleware/auth')
const {
  getOrderByUserIdRedis,
  getOrderDetailByUserIdRedis,
  getOrderByInvoiceRedis,
  clearOrderByIdRedis
} = require('../middleware/redis')

router.get('/:customerId', isLogin, getOrderByUserIdRedis, getOrderByUserId)
router.get(
  '/history/:customerId',
  isLogin,
  getOrderDetailByUserIdRedis,
  getOrderDetailHistory
)
router.get(
  '/invoice/:invoice',
  isLogin,
  getOrderByInvoiceRedis,
  getOrderByInvoice
)
router.post('/', isLogin, clearOrderByIdRedis, postOrder)
router.delete('/:invoice', isLogin, clearOrderByIdRedis, deleteOrder)

module.exports = router
