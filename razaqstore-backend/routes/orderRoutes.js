const express = require('express')
const router = express.Router()
const {
    createOrder,
    getSingleOrder,
    getAllOrder,
    deleteOrder
} = require('../controllers/orderController')
const {authenticateUser} = require('../middleware/authentication')
const {authenticateCartUser} =  require('../middleware/authenticateCartUser')
router.route('/')
    .post(authenticateUser, createOrder)
    .get( authenticateCartUser , getAllOrder)
router.route('/:id').get(getSingleOrder)
router.route('/:id').post(deleteOrder)

module.exports = router