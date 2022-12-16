const CustomError = require('../errors')
const UserProfile = require('../model/UserProfile')
const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const { checkPermission } = require('../utils')


const createUserProfile = async(req, res)=>{
    console.log(req.body, req.user)

    if(Object.keys(req.body).length < 1){
        throw new CustomError.UnauthenticatedError('Invalid request')
    }    

    let userProfile = await UserProfile.findOne({user:req.user.userId})
    if(!userProfile){
        userProfile = await UserProfile.create({user:req.user.userId, ...req.body})
        res.status(StatusCodes.CREATED).json(userProfile)
        return
    }

    userProfile = await UserProfile.findOneAndUpdate({user:req.user.userId}, req.body, {
        new: true,
        runValidators: true
    })
    res.status(StatusCodes.OK).json(userProfile)
}
const getSingleUserProfile = async(req, res)=>{
    const {id} = req.params

    const user = await User.findOne({_id: id})
    if(!user){
        throw new CustomError.NotFoundError('user does not exist')
    }

    const userProfile = await UserProfile.findOne({user: user._id}).select('-__v -_id')
    if(!userProfile){
        const {_id:userId, name, email} = user
        
        checkPermission(req.user, user._id)
        res.status(StatusCodes.OK).json({userId, name, email})
    }
    const temp = userProfile
    const {_id:userId, name, email} = user
    const allUserInfo = {...temp._doc, userId, name, email}
    
    checkPermission(req.user, userProfile.user)
    console.log(allUserInfo)

    res.status(StatusCodes.OK).json(allUserInfo)
}
const getAllProfile = async(req, res)=>{
    const userProfile = await UserProfile.find({})

    res.status(StatusCodes.OK).json(userProfile)
}
const getCurrentUserProfile = async(req, res)=>{
    const user = await User.findOne({_id: req.user.userId})
    const {_id:userId, name, email} = user
    
    const userProfile = await UserProfile.findOne({user: user._id})
    let allUserInfo = {userId, name, email}

    if(userProfile){
        allUserInfo = {...userProfile._doc, userId, name, email}
    }
    
    res.status(StatusCodes.OK).json({user: allUserInfo})
}

module.exports = { 
    createUserProfile,
    getSingleUserProfile,
    getCurrentUserProfile,
    getAllProfile
}