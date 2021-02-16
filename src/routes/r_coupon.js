const router = require('express').Router()
const {
  getCoupon,
  getCouponById,
  getCouponActive,
  getCouponActiveById,
  postCoupon,
  patchCoupon,
  deleteCoupon
} = require('../controller/c_coupon')
const { isLogin, isAdmin } = require('../middleware/auth')

router.get('/active', getCouponActive)
router.get('/active/:id', getCouponActiveById)
router.get('/', getCoupon)
router.get('/:id', getCouponById)
router.post('/', isLogin, isAdmin, postCoupon)
router.patch('/:id', isLogin, isAdmin, patchCoupon)
router.delete('/:id', isLogin, isAdmin, deleteCoupon)

module.exports = router
