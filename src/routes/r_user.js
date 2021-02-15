const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  updatePassword,
  activateUser,
  forgotPassword,
  resetPassword
} = require('../controller/c_user')
const { isLogin } = require('../middleware/auth')
const { getUserRedis, clearUserRedis } = require('../middleware/redis')
const uploadImage = require('../middleware/multer')

router.get('/:email', isLogin, getUserRedis, getUser)
router.post('/register', uploadImage, registerUser)
router.post('/login', loginUser)
router.patch('/update/:email', isLogin, clearUserRedis, uploadImage, updateUser)
router.patch('/update/password/:email', isLogin, clearUserRedis, updatePassword)
router.patch('/active', activateUser)
router.patch('/forgot', forgotPassword)
router.patch('/reset', resetPassword)

module.exports = router
