const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { isLogin, isAdmin } = require('../middleware/auth')
const {
  getProductByIdRedis,
  getProductRedis,
  getProductDetaildRedis,
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

router.get('/', isLogin, getProductRedis, getProduct)
router.get('/:id', isLogin, getProductByIdRedis, getProductById)
router.get(
  '/detail/:id',
  isLogin,
  isAdmin,
  getProductDetaildRedis,
  getProductDetail
)
router.post(
  '/',
  isLogin,
  isAdmin,
  clearDataProductRedis,
  uploadImage,
  postProduct
)
router.patch(
  '/:id',
  isLogin,
  isAdmin,
  clearDataProductRedis,
  uploadImage,
  patchProduct
)
router.delete('/:id', isLogin, isAdmin, clearDataProductRedis, deleteProduct)

module.exports = router
