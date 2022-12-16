const express = require('express')
const router = express.Router()
const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    similarProduct,
    getProductsByCategory
} = require('../controllers/productController')
const { authenticateUser, authorizePermission } = require('../middleware/authentication')

router.route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizePermission('seller'), createProduct)
router.route('/single/')
    .get(getSingleProduct)
    
router.route('/similar/:categoryName')
    .get(similarProduct)
    
router.route('/:id')
    .get(getProductsByCategory)
    .patch(authenticateUser, updateProduct)
    .delete(authenticateUser, deleteProduct)
    
module.exports = router



