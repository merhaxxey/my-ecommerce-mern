const express = require('express')
const router = express.Router()
const {
    createReview,
    getAllReview,
    getSingleReview,
    deleteReview
} = require('../controllers/reviewController')
const { authenticateUser, authorizePermission } = require('../middleware/authentication')

router.route('/')
    .get(authenticateUser, authorizePermission('admin'), getAllReview)
router.route('/:id')
    .get(getSingleReview)
    .post(authenticateUser, createReview)
    .delete(authenticateUser, deleteReview)

module.exports = router