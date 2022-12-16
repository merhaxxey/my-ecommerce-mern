const express = require('express')
const router = express.Router()
const {
    createCart,
    getAllCart,
    getSingleCart,
    updateCart,
    deleteCart,
    deleteAllCart,
    transferCart
} = require('../controllers/cartController')

const {authenticateCartUser} = require('../middleware/authenticateCartUser')

router.route('/')
    .get(authenticateCartUser, getAllCart)
    .post(authenticateCartUser, createCart)
    .delete(authenticateCartUser, deleteAllCart)
router.route('/transfer/:id')
    .patch(authenticateCartUser, transferCart)
router.route('/:id')
    .get(authenticateCartUser, getSingleCart)
    .patch(authenticateCartUser, updateCart)
    .delete(authenticateCartUser, deleteCart)

module.exports = router