const mongoose = require('mongoose')

const RecentlyViewedSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img:{
        type: [String],
        required: true
    },
    price:{
        type: Number,
        required: true 
    },
    discount:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('RecentlyViewed', RecentlyViewedSchema)