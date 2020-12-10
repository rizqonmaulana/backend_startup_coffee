const router = require('express').Router()
const {
  getCoupon,
  getCouponById,
  postCoupon,
  patchCoupon,
  deleteCoupon
} = require('../controller/c_coupon')

router.get('/', getCoupon)
router.get('/:id', getCouponById)
router.post('/', postCoupon)
router.patch('/:id', patchCoupon)
router.delete('/:id', deleteCoupon)

module.exports = router
