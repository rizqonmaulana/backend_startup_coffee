const router = require('express').Router()
const { getProductByCategory } = require('../controller/c_category')

router.get('/:id', getProductByCategory)

module.exports = router
