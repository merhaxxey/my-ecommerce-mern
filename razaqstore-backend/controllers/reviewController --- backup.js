const Review = require('../model/Review')
const CustomError = require('../errors')
const { StatusCodes } = require("http-status-codes")
const { checkPermission } = require('../utils')
const Product = require('../model/Product')

const createReview = async(req, res)=>{
    const {
        rating,
        title,
        comment
    } = req.body
    const {id:productId} = req.params

    
    const product = await Product.findOne({_id: productId})
    if(!product){
        throw new CustomError.BadRequestError(`No product with id - ${product._id}`)
    }

    const review = await Review.create({
        rating,
        title,
        comment,
        user: req.user.userId,
        product: product._id
    })
    res.status(StatusCodes.CREATED).json({review})
}
const getAllReview = async(req, res)=>{
    const reviews = await Review.find({})

    res.status(StatusCodes.OK).json({reviews})
}
const getSingleReview = async(req, res)=>{
    const {id: reviewId} = req.params
    const review = await Review.findOne({_id: reviewId})
    if(!review){
        throw new CustomError.NotFoundError(`No review found with id - ${reviewId}`)
    }

    res.status(StatusCodes.OK).json('get single review')
}
const deleteReview = async(req, res)=>{
    // checkPermission()
    res.status(StatusCodes.OK).json('delete review')
}

module.exports = {
    createReview,
    getAllReview,
    getSingleReview,
    deleteReview
}
