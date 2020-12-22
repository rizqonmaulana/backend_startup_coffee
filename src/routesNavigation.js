const router = require('express').Router()
const product = require('./routes/r_product')
const category = require('./routes/r_category')
const coupon = require('./routes/r_coupon')
const order = require('./routes/r_order')
const user = require('./routes/r_user')

router.use('/product', product)
router.use('/category', category)
router.use('/coupon', coupon)
router.use('/order', order)
router.use('/user', user)

module.exports = router
