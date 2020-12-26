const router = require('express').Router()
const { getProductByCategory } = require('../controller/c_category')
const { getProductByCategoryRedis } = require('../middleware/redis')

router.get('/:categoryName', getProductByCategoryRedis, getProductByCategory)

module.exports = router
