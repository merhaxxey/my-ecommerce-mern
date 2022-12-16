const express = require('express')
const router = express.Router()
const {
    getAllCatergories,
    getSingleCatergory,
    createCatergory,
    updateCatergory,
    deleteCatergory
} = require('../controllers/categoriesController')
const { authenticateUser, authorizePermission } = require('../middleware/authentication')

router.route('/')
    .get(getAllCatergories)
    .post(authenticateUser, authorizePermission('admin'), createCatergory)
router.route('/:id')
    .get(getSingleCatergory)
    .patch(authenticateUser, authorizePermission('admin'), updateCatergory)
    .delete(authenticateUser, authorizePermission('admin'), deleteCatergory)

module.exports = router