const express = require('express')
const router = express.Router()
const {
    createUserProfile,
    getSingleUserProfile,
    getAllProfile,
    getCurrentUserProfile
} = require('../controllers/userProfileController')
const {authenticateUser, authorizePermission} = require('../middleware/authentication')

router.route('/')
    .post(authenticateUser, createUserProfile)
    .get(authenticateUser, authorizePermission('admin'), getAllProfile)
router.route('/showMe')
    .get(authenticateUser, getCurrentUserProfile)
router.route('/:id')
    .get(authenticateUser, getSingleUserProfile)

module.exports = router
