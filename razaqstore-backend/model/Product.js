const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    category:{
        type: String,
        required: [true, 'please provide a category']
    },
    name:{
        type: String,
        required: ['please provide the name of the product'],
        trim: true,
        maxlength: 300
    },
    categoryIndex:{
        type: Number,
        required: [true, "category index missing"]
    },
    brand:{
        type: String,
        maxlength: 20
    },
    price:{
        type: Number,
        required: [true, "price of the product is required"],
    },
    sold:{
        type:Number,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    freeShipping:{
        type: Boolean,
        default: false
    },
    discount:{
        type: Number,
        default: 0
    },
    img: {
        type: [String],
        required: [true, "please provide at least one of the product"]
    },
    product_details:{
        type: String,
        required: [true, "provide description of the product"]
    },
    specifications:{
        type: Object,
        required: false
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }
}, {timestamps: true, toJSON:{virtuals: true}, toObject:{virtuals:true}})

ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false
})

ProductSchema.pre('remove', async function(){
    await this.model('Review').deleteMany({product:this._id})
})

module.exports = mongoose.model('Product', ProductSchema)