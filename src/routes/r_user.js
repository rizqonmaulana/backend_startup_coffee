const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  updatePassword
} = require('../controller/c_user')
const { isLogin } = require('../middleware/auth')

router.get('/:email', getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update/:email', isLogin, updateUser)
router.patch('/update/password/:email', updatePassword)

module.exports = router
