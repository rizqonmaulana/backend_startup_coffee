const router = require('express').Router()
const { registerUser, loginUser, updateUser } = require('../controller/c_user')
const { isLogin } = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update', isLogin, updateUser)

module.exports = router
