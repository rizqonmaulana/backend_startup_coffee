const router = require('express').Router()
const {
  getOrderByUserId,
  getOrderByInvoice,
  getOrderDetailHistory,
  getOrderAdmin,
  getOrderDetailAdmin,
  getOrderYearIncome,
  getOrderWeekCount,
  getOrderDailyIncome,
  patchOrder,
  postOrder,
  deleteOrder
} = require('../controller/c_order')
const { isLogin, isAdmin } = require('../middleware/auth')
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
router.get('/admin/list', isLogin, isAdmin, getOrderAdmin)
router.get('/admin/list/detail', isLogin, isAdmin, getOrderDetailAdmin)
router.get('/admin/year-income', isLogin, isAdmin, getOrderYearIncome)
router.get('/admin/week-order', isLogin, isAdmin, getOrderWeekCount)
router.get('/admin/daily-income', isLogin, isAdmin, getOrderDailyIncome)
router.post('/', isLogin, clearOrderByIdRedis, postOrder)
router.patch('/', patchOrder)
router.delete('/:invoice', isLogin, clearOrderByIdRedis, deleteOrder)

module.exports = router
