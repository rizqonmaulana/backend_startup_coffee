const router = require('express').Router()
const {
  getOrder,
  getOrderDetail,
  getOrderHistory,
  postOrder,
  deleteOrder,
  deleteOrderDetailById
} = require('../controller/c_order')
const { isLogin } = require('../middleware/auth')

router.get('/:customerId', isLogin, getOrder)
router.get('/invoice/:invoice', isLogin, getOrderDetail)
router.get('/history/:customerId', isLogin, getOrderHistory)
router.post('/', isLogin, postOrder)
router.delete('/:id', isLogin, deleteOrder)
router.delete('/history/:id', isLogin, deleteOrderDetailById)

module.exports = router
