const router = require('express').Router()
const { getProductByCategory } = require('../controller/c_category')

router.get('/:categoryName', getProductByCategory)

module.exports = router
