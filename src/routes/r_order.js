const router = require('express').Router()
const { getOrder, postOrder, deleteOrder } = require('../controller/c_order')

router.get('/:customerId', getOrder)
router.post('/', postOrder)
router.delete('/:id', deleteOrder)

module.exports = router
