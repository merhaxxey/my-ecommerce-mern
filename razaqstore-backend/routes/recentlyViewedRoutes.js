const express = require('express')
const { getAllRecentProducts } = require('../controllers/recentlyViewedController')
const router = express.Router()

router.route('/').get(getAllRecentProducts)

module.exports = router