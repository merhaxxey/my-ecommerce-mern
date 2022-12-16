const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    img:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        minLength: 1,
        maxLength: 500,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type: mongoose.Types.ObjectId,
        model: 'Product',
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        model: 'User',
        required: false
    },
    token:{
        type: String,
        required: false
    }
})

CartSchema.index({product: 1, user: 1}, {unique: true})
CartSchema.index({product: 1, token: 1}, {unique: true})

module.exports = mongoose.model('Cart', CartSchema)