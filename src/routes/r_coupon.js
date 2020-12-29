const router = require('express').Router()
const {
  getCoupon,
  getCouponById,
  getCouponActive,
  postCoupon,
  patchCoupon,
  deleteCoupon
} = require('../controller/c_coupon')
const { isLogin, isAdmin } = require('../middleware/auth')
const {
  getCouponRedis,
  getCouponByIdRedis,
  getCouponActiveRedis,
  clearCouponRedis
} = require('../middleware/redis')

router.get('/active', getCouponActiveRedis, getCouponActive)
router.get('/', getCouponRedis, getCoupon)
router.get('/:id', getCouponByIdRedis, getCouponById)
router.post('/', isLogin, isAdmin, clearCouponRedis, postCoupon)
router.patch('/:id', isLogin, isAdmin, clearCouponRedis, patchCoupon)
router.delete('/:id', isLogin, isAdmin, clearCouponRedis, deleteCoupon)

module.exports = router
