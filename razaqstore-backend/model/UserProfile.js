const { required } = require('joi')
const mongoose = require('mongoose')

const UserProfileSchema = mongoose.Schema({
    phoneNumber:{
        type: String,
        minLength: 10,
        maxLength: 11,
        required: false
    },
    birthday:{
        type: String,
        minLength: 8,
        required: false
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Invalid gender'
        },
        required: false
    },
    state:{
        type: String,
        enum: {
            values: [
                'Ekiti State',
                'Kogi State',
                'Kwara State',
                'Ogun State',
                'Ondo State',
                'Osun State',
                'Oyo State',
                'Lagos State'
            ],
            message: 'Invalid state'
        },
        required: false
    },
    address:{
        type: String,
        minLength: 5,        
        required: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is not defined']
    }
})

module.exports = mongoose.model('UserProfile', UserProfileSchema)   