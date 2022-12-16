const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'please enter a valid email'
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    role:{
        type:String,
        required: true,
        enum: {
            values:['admin', 'buyer', 'seller'],
            message:'role does not exist'
        }
    },
    buisnessName: {
        type: String,
        trim: true,
    },
    verificationToken:{
        type: String
    },
    isVerified:{
        type: String,
        default: false
    },
    verified: {
        type: Date
    },
    passwordToken:{
        type: String
    },
    passwordTokenExpiration:{
        type: String
    }
}, {timestamps: true})

UserSchema.pre('save', async function(){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})
UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)