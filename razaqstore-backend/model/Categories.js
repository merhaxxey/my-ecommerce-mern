const mongoose = require('mongoose')
const CategoriesSchema = new mongoose.Schema({
    index:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    items: {
        type: Object,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Categories', CategoriesSchema)