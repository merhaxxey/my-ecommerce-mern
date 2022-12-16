const Product = require('../model/Product')
const Review = require('../model/Review')
const User = require('../model/User')
const Categories = require('../model/Categories')
const RecentlyViewed = require('../model/RecentlyViewed')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermission } = require('../utils')

const createProduct = async(req, res)=>{
    const {
            category,
            name,
            categoryIndex,
            brand,
            price,
            sold,
            freeShipping,
            discount,
            img,
            product_details,
            specifications
        } = req.body
    
    // confirm if category is available in the database
    if(!category){
        throw new CustomError.BadRequestError('category is missing')
    }

    const {items} = await Categories.findOne({index:categoryIndex}).select('items')
    isAvailableCategory = Object.keys(items).find((item, index)=>{
        return category === item
    })
    if(!isAvailableCategory){
        throw new CustomError.UnauthenticatedError('the category you entered is not available ')
    }

    const product = await Product.create({
        category,
        name,
        categoryIndex,
        brand,
        price,
        sold,
        freeShipping,
        discount,
        img,
        product_details,
        specifications,
        user: req.user.userId
    })
    res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async(req, res)=>{
    const agg = Product.aggregate([
        {
            "$sample":{
                size: 24
            }
        }
    ])

    const products = await agg.exec()
    res.status(StatusCodes.OK).json({count:products.length, products})
}
const getSingleProduct = async(req, res)=>{
    let {name:productName} = req.query
    productName = productName
        .split('*and*').join('&')
        .split('*plus*').join('+')
    console.log(productName)
    const product = await Product.findOne({name:productName}).populate({
        path: 'reviews',
        options:{
             blimit: 3
        }
    })

    let reviewUserName = []
    let reviewUserId = 0
    for(i=0; i<product.reviews.length; i++){
        reviewUserId = product.reviews[i].user
        const {name} = await User.findOne({_id: reviewUserId}).select('name')
        reviewUserName.push(name)
    }

    if(!product){
        throw new CustomError.NotFoundError(` product not found`)
    }
    const agg = Review.aggregate([
        {
            $match:{
                product: product._id 
            }
        },
        {
            $group: {
                _id: "$rating",
                amount: {$sum: 1}
            }
        }
    ])
    const reviewsPerRatingLevel = await agg.exec()

    // store recently viewed products
    const {_id:userId, name, img, price, discount, } = product._doc

    const recentProduct = await RecentlyViewed.find({})
    if (recentProduct.length >= 10){
        await RecentlyViewed.findOneAndDelete({user: recentProduct[recentProduct.length-1]._id})
    }
    
    const existRecentProduct = await RecentlyViewed.findOne({user: product._id})
    if(existRecentProduct){
        await RecentlyViewed.findOneAndDelete({user: existRecentProduct.user})
    }
    await RecentlyViewed.create({user:userId, name, img, price, discount})


    res.status(StatusCodes.OK).json({product, reviewsPerRatingLevel, reviewUserName})
}
const updateProduct = async(req, res)=>{
    const {id:productId} = req.params
    const {
        name, price, discount
    } = req.body
 
    let product = await Product.findOne({_id:productId})
    if(!product){
        throw new CustomError.NotFoundError(`No product with id - ${product}`)
    }

    checkPermission(req.user, product.user)
    
    product = await Product.findOneAndUpdate({_id:productId}, req.body, {
        new: true,
        runValidators: true
    })

    res.status(StatusCodes.OK).json({product})
}
const deleteProduct = async(req, res)=>{
    const {id:productId} = req.params
    const product = await Product.findOne({_id:productId})
    if(!product){
        throw new CustomError.NotFoundError(`No product with id - ${productId}`)
    }
    checkPermission(req.user, product.user)
    await product.delete()
    
    res.status(StatusCodes.OK).json({msg: `${productId} deleted successfully`})
}
const similarProduct = async(req, res)=>{
    const {categoryName} = req.params
    console.log('------------- category',req.params, categoryName)
    const product = await Product.find({category: categoryName}).limit(2)

    res.status(StatusCodes.OK).json({count: product.length, product})
} 

const getProductsByCategory = async(req, res)=>{
    console.log(req.params.id)
    const products = await Product.find({categoryIndex: req.params.id})
    res.status(StatusCodes.OK).json({count:products.length, products})
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    similarProduct
}