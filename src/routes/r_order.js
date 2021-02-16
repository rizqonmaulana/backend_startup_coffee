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
  deleteOrder,
  getChartData
} = require('../controller/c_order')
const { isLogin, isAdmin } = require('../middleware/auth')

router.get('/:customerId', isLogin, getOrderByUserId)
router.get('/history/:customerId', isLogin, getOrderDetailHistory)
router.get('/invoice/:invoice', isLogin, getOrderByInvoice)
router.get('/admin/list', isLogin, isAdmin, getOrderAdmin)
router.get('/admin/list/detail', isLogin, isAdmin, getOrderDetailAdmin)
router.get('/admin/year-income', isLogin, isAdmin, getOrderYearIncome)
router.get('/admin/week-order', isLogin, isAdmin, getOrderWeekCount)
router.get('/admin/daily-income', isLogin, isAdmin, getOrderDailyIncome)
router.get('/admin/chart', getChartData)
router.post('/', isLogin, postOrder)
router.patch('/', patchOrder)
router.delete('/:invoice', isLogin, deleteOrder)

module.exports = router
