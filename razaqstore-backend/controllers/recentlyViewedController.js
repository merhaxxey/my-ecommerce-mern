const { StatusCodes } = require('http-status-codes')
const RecentlyViewed = require('../model/RecentlyViewed')
const CustomError = require('../errors')
const createRecentProduct = async(req, res)=>{
    const product = await RecentlyViewed.create(req.body)

    res.status(StatusCodes.CREATED).json(product)
}

const getAllRecentProducts = async(req, res)=>{
    const products = await RecentlyViewed.find({})

    res.status(StatusCodes.OK).json({count:products.length, products})
}

const deleteRecentProduct = async(req, res)=>{
    const product = await RecentlyViewed.findOneAndDelete({_id: req.body.id})
    if(!product){
        throw new CustomError.NotFoundError('Product does not exist')
    }
    res.status(StatusCodes.OK).json('product deleted successfully')
}

module.exports = {createRecentProduct, getAllRecentProducts, deleteRecentProduct}