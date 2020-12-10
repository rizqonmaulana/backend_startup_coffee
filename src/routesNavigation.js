const router = require('express').Router()
const product = require('./routes/r_product')
const category = require('./routes/r_category')

router.use('/product', product)
router.use('/category', category)

module.exports = router
