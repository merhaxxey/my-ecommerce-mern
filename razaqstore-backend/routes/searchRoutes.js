const express = require('express')
const router = express.Router()
const {
    searchProduct
} = require('../controllers/searchController')

router.route('/:q')
    .get(searchProduct)

module.exports = router