const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    rating: {
        type:Number,
        default: 0
    },
    title:{
        type: String,
        required: true,
        maxlength: 60
    },
    comment:{
        type:String,
        required: true,
        maxlength: 1000
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

ReviewSchema.index({product: 1, user: 1}, {unique: true})

ReviewSchema.statics.calculateAverageRating = async function(productID){
    const result = await this.aggregate([
        {$match: {product: productID}},
        {
            $group:{
                _id: null,
                averageRating: {$avg: "$rating"},
                numOfReviews:{$sum: 1}
            }
        }
    ])
    try {

        await this.model('Product').findOneAndUpdate({_id:productID}, 
            {
                averageRating:result? result[0].averageRating.toFixed(1): 0,
                numOfReviews: result? result[0].numOfReviews: 0,
            }
        )
    } catch (error) {
        console.log(error)
    }
}

ReviewSchema.post('save', async function(){
    await this.constructor.calculateAverageRating(this.product)
})

ReviewSchema.post('remove', async function(){
    await this.constructor.calculateAverageRating(this.product)
})


module.exports = mongoose.model('Review', ReviewSchema)