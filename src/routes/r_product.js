const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { isLogin, isAdmin } = require('../middleware/auth')
const {
  getProductByIdRedis,
  getProductRedis,
  clearDataProductRedis
} = require('../middleware/redis')
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductDetail
} = require('../controller/c_product')

router.get('/', isLogin, isAdmin, getProductRedis, getProduct)
router.get('/:id', getProductByIdRedis, getProductById)
router.get('/detail/:id', getProductDetail)
router.post('/', uploadImage, postProduct)
router.patch('/:id', clearDataProductRedis, uploadImage, patchProduct)
router.delete('/:id', deleteProduct)

module.exports = router
