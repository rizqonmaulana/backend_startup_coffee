const router = require('express').Router()
const { registerUser, loginUser, updateUser } = require('../controller/c_user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update', updateUser)

module.exports = router
