const router = require('express').Router()
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductDetail
} = require('../controller/c_product')

router.get('/', getProduct)
router.get('/:id', getProductById)
router.get('/detail/:id', getProductDetail)
router.post('/', postProduct)
router.patch('/:id', patchProduct)
router.delete('/:id', deleteProduct)

module.exports = router
