const Order = require('../model/Order')
const Product = require('../model/Product')
const CustomError = require('../errors')
const crypto = require('crypto')
const { StatusCodes } = require('http-status-codes')

const createOrder = async(req, res)=>{
    const {shippingFee, cartItems, paymentReference, status} = req.body

    if(!shippingFee || !paymentReference || !status){
        throw new CustomError.BadRequestError('Invalid request')
    }
    if(cartItems.length < 1){
        throw new CustomError.BadRequestError('Invalid request')
    }
    const clientSecret = crypto.randomBytes(20).toString('hex')    
    let total = 0, subtotal = 0
    let orderItems = []
    for(const item of cartItems){
        const product = await Product.findOne({_id: item.product})
        if(!product){
            throw new CustomError.NotFoundError('Product not found')
        }

        const {name, price, _id} = product

        const singleOrderItem = {
            quantity: item.quantity,
            name,
            image: product.img[0],
            price,
            product: _id
        }

        orderItems = [...orderItems, singleOrderItem]
        subtotal += price * item.quantity
    }

    total = subtotal + shippingFee

    console.log({
        shippingFee,
        subtotal,
        total,
        orderItems,
        paymentReference,
        clientSecret,
        status,
        user: req.user.userId
    })

    const order = await Order.create({
        shippingFee,
        subtotal,
        total,
        orderItems,
        paymentReference,
        clientSecret,
        status,
        user: req.user.userId
    })

    res.status(StatusCodes.CREATED).json({order})
}
const getSingleOrder = async(req, res)=>{
    const order = await Order.findOne({_id: req.params.id})
    if(order){
        throw new CustomError.NotFoundError('No orders found')
    }

    res.status(StatusCodes.OK).json({order})
}
const getAllOrder = async(req, res)=>{
    const order = await Order.find({user: req.user.userId})
    let orderItems = [];
    console.log(order)
    order.map((item, index)=>{
        item.orderItems.map((item, index)=>{
            orderItems.push(item)
        })
    })

    console.log(orderItems)

    res.status(StatusCodes.OK).json({count: order.length, order:orderItems})
}
const deleteOrder = async(req, res)=>{
    const order = await Order.findOneAndDelete({_id: req.body.orderId})
    res.status(StatusCodes.OK).json({msg: 'order deleted successfully'})
}

module.exports = {
    createOrder,
    getSingleOrder,
    getAllOrder,
    deleteOrder
}