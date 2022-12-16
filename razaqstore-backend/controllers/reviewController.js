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
        throw new CustomError.BadRequestError(`Sorry, you can't make review on a product that doesn't exist`)
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
    const reviews = await Review.find({}).populate(
        {
        path: 'product',
        select: 'name price',
        }
    )

    res.status(StatusCodes.OK).json({count:reviews.length, reviews})
}
const getSingleReview = async(req, res)=>{
    const {id: reviewId} = req.params
    const review = await Review.findOne({_id: reviewId})
    if(!review){
        throw new CustomError.NotFoundError(`No review found with id - ${reviewId}`)
    }

    res.status(StatusCodes.OK).json({review})
}
const deleteReview = async(req, res)=>{
    const review = await Review.findOne({_id:req.params.id})
    if(!review){
        throw new CustomError.NotFoundError(`No review found with id - ${reviewId}`)
    }
    checkPermission(req.user, review.user)
    
    await review.delete()
    
    res.status(StatusCodes.OK).json({msg: 'review deleted successfully'})
}

module.exports = {
    createReview,
    getAllReview,
    getSingleReview,
    deleteReview
}
