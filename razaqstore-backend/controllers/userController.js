const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermission } = require('../utils')

const getAllUsers = async(req, res)=>{
    const users = await User.find({})
    res.status(StatusCodes.OK).json({count: users.length, users})
}
const getSingleUser = async(req, res)=>{
    const {id} = req.params

    console.log(id)
    const user = await User.findOne({_id:id}).select('_id name email')
    if(!user){
        throw new CustomError.NotFoundError(`No user found with id - ${id}`)
    }

    checkPermission(req.user, user._id)
    console.log(user)
    res.status(StatusCodes.OK).json({user})
}
const getUserWithEmail = async(req, res)=>{
    const {email} = req.params

    const user = await User.findOne({email}).select('_id name email')
    if(!user){
        throw new CustomError.NotFoundError(`No user found`)
    }

    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async(req, res)=>{
    const user = await User.findOne({_id:req.user.userId})
    if(!user){
        throw new CustomError.NotFoundError('No user found')
    }

    res.status(StatusCodes.OK).json({user: req.user})
}
const updateUser = async(req, res)=>{
    // const {name, email} = req.body
    const user = await User.findOneAndUpdate({_id: req.user.userId}, req.body, {
        new: true,
        runValidators: true
    })
    if(!user){
        throw new CustomError.NotFoundError('No account found')
    }
    
    res.status(StatusCodes.OK).json({user})
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    getUserWithEmail
}