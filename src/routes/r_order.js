const router = require('express').Router()
const {
  getOrderByUserId,
  getOrderByInvoice,
  getOrderDetailHistory,
  getOrderAdmin,
  patchOrder,
  postOrder,
  deleteOrder
} = require('../controller/c_order')
// const { isLogin } = require('../middleware/auth')
const {
  getOrderByUserIdRedis,
  getOrderDetailByUserIdRedis,
  getOrderByInvoiceRedis,
  clearOrderByIdRedis
} = require('../middleware/redis')

router.get(
  '/:customerId',
  // isLogin,
  getOrderByUserIdRedis,
  getOrderByUserId
)
router.get(
  '/history/:customerId',
  // isLogin,
  getOrderDetailByUserIdRedis,
  getOrderDetailHistory
)
router.get(
  '/invoice/:invoice',
  // isLogin,
  getOrderByInvoiceRedis,
  getOrderByInvoice
)
router.get('/list/admin', getOrderAdmin)
router.post(
  '/',
  // isLogin,
  clearOrderByIdRedis,
  postOrder
)
router.patch('/', patchOrder)
router.delete(
  '/:invoice',
  // isLogin,
  clearOrderByIdRedis,
  deleteOrder
)

module.exports = router
