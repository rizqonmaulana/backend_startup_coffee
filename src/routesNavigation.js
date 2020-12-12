const router = require('express').Router()
const product = require('./routes/r_product')
const category = require('./routes/r_category')
const coupon = require('./routes/r_coupon')
const order = require('./routes/r_order')

router.use('/product', product)
router.use('/category', category)
router.use('/coupon', coupon)
router.use('/order', order)

module.exports = router
