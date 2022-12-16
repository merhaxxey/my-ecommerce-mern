const Cart = require('../model/Cart')
const crypto  = require('crypto')
const { attachOneCookieToResponse, isTokenValid } = require('../utils/jwt')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')

const createCart = async(req, res)=>{
    const {img, name, price, quantity, product} = req.body
    const payload = {img, name, price, quantity, product}
    console.log(payload)
    payload.img = payload.img[0]


    if(req.user){

        console.log('i just entered user')
        payload.user = req.user.userId
        
         const cart = await Cart.create(payload)
        const allCart = await Cart.find({user: req.user.userId})
        res.status(StatusCodes.CREATED).json({cart, allCart})
    }
    
    if(!req.user){
        console.log('i just entered token')
        if(!req.token){
            req.token  = crypto.randomBytes(40).toString('hex')
        }

        const cart = await Cart.create({...payload, token:req.token})
        const allCart = await Cart.find({token: req.token})

        attachOneCookieToResponse({res, token:req.token, name:'rm-c'})
        res.status(StatusCodes.CREATED).json({cart, allCart})
    }
} 
const getAllCart = async(req, res)=>{
    if(req.user){
        const cart = await Cart.find({user: req.user.userId})
        res.status(StatusCodes.OK).json({count:cart.length, cart})
    }
    
    if(!req.user){
        if(!req.token) return res.status(StatusCodes.OK).json({count: 0, cart:[]}) 
        const cart = await Cart.find({token: req.token})
        res.status(StatusCodes.OK).json({count:cart.length, cart})
    }
}
const getSingleCart = async(req, res)=>{
    let cart, allCart
    if(req.user){
        console.log('gettimg cart')
        cart = await Cart.findOne({product: req.params.id, user:req.user.userId})
        allCart = await Cart.find({user: req.user.userId})
        console.log(allCart, cart)
    }
    else{
        cart = await Cart.findOne({product: req.params.id, token: req.token})
        allCart = await Cart.find({token: req.token})
    }

    // if(!cart){
    //     throw new CustomError.NotFoundError('Product not found')
    // }
    res.status(StatusCodes.OK).json({cart, allCart})
}
const updateCart = async(req, res)=>{
    let cart, allCart
    if(req.user){
        cart = await Cart.findOneAndUpdate({product: req.params.id, user:req.user.userId}, req.body, {
            new: true,            
            runValidators: true
        })
        allCart = await Cart.find({user: req.user.userId})
    }
    else{
        cart = await Cart.findOneAndUpdate({product: req.params.id, token: req.token}, req.body, {
            new: true,            
            runValidators: true
        })
        allCart = await Cart.find({token: req.token})
    }
    if(!cart){
        throw new CustomError.NotFoundError('Product not found')
    }
    res.status(StatusCodes.OK).json({cart, allCart})

}
const deleteCart = async(req, res)=>{
    let cart, allCart
    if(req.user){
        cart = await Cart.findOneAndDelete({product: req.params.id, user:req.user.userId})
        allCart = await Cart.find({user: req.user.userId})
    }
    else{
        cart = await Cart.findOneAndDelete({product: req.params.id, token: req.token})
        allCart = await Cart.find({token: req.token})
    }

    if(!cart){
        throw new CustomError.NotFoundError('Product not found')
    }
    res.status(StatusCodes.OK).json({msg: 'cart deleted sucessfully', allCart})
}
const deleteAllCart = async(req, res)=>{
    let cart, allCart
    if(req.user){
        cart = await Cart.deleteMany({user:req.user.userId})
        allCart = await Cart.find({user: req.user.userId})
    }
    else{
        console.log(req.token)
        cart = await Cart.deleteMany({token: req.token})
        allCart = await Cart.find({token: req.token})
    }

    res.status(StatusCodes.OK).json({msg: 'cart deleted sucessfully', allCart})
}


const transferCart = async(req, res)=>{
    let cart, allCart

    cart = await Cart.findOneAndUpdate({_id: req.params.id, }, {user: req.user.userId
        , token: null
    }, {
        new: true,
        runValidators: true
    })
    allCart = await Cart.find({user: req.user.userId})

    if(!cart){
        throw new CustomError.NotFoundError('cart not found')
    }
    res.status(StatusCodes.OK).json({cart, allCart})
    
}

module.exports = {
    createCart,
    getAllCart,
    getSingleCart,
    updateCart,
    deleteCart,
    deleteAllCart,
    transferCart
}