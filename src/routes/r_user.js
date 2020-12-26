const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  updatePassword
} = require('../controller/c_user')
const { isLogin } = require('../middleware/auth')
const { getUserRedis, clearUserRedis } = require('../middleware/redis')

router.get('/:email', isLogin, getUserRedis, getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update/:email', isLogin, clearUserRedis, updateUser)
router.patch('/update/password/:email', isLogin, clearUserRedis, updatePassword)

module.exports = router
