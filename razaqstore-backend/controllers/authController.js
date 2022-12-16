const User = require('../model/User')
const CustomError = require('../errors/')
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto')
const sendEmailVerification = require('../utils/sendEmailVerification')
const { createTokenUser, attachCookiesToResponse, createHash } = require('../utils')
const Token = require('../model/Token')
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail')

const register = async(req, res)=>{
    let {name, email, role, buisnessName} = req.body
    
    req.body.role = (await User.countDocuments() === 0)? 'admin': role
    if(role === 'seller' && !buisnessName){
        throw new CustomError.BadRequestError('Please provide your business name or brand name')
    }
    const origin = 'http://localhost:3000'
    const verificationToken = crypto.randomBytes(40).toString('hex')

    await sendEmailVerification({name, email, verificationToken, origin})

    const user = await User.create({...req.body, verificationToken})
    
    user.verificationToken = null
    user.isVerified = true
    user.verified = new Date(Date.now())
    await user.save()


    
    res.status(StatusCodes.OK).json({user})
}
const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new CustomError.BadRequestError('please provide your email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError.NotFoundError(`incorrect email or password`)
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new CustomError.NotFoundError(`incorrect email or password`)
    }

    if(!user.isVerified){
        throw new CustomError.UnauthenticatedError('This account has not been verified')
    }

    let refreshToken = ''

    //check or existing token
    const existingToken = await Token.findOne({user:user._id})
    
    if(existingToken){
        const {isValid} = existingToken
        if(!isValid){
            throw new CustomError.UnauthenticatedError('Invalid credentials');
        }
        refreshToken = existingToken.refreshToken

        console.log('refreshToken from existingToken in --- login', existingToken.refreshToken)
        const tokenUser = createTokenUser(user)
        attachCookiesToResponse({res, user:tokenUser, refreshToken})
        res.status(StatusCodes.OK).json({user: tokenUser})
        return
    }

    //else we create a new token
    refreshToken = crypto.randomBytes(40).toString('hex')
    const ip = req.ip
    const userAgent = req.headers['user-agent']

    await Token.create({
        refreshToken,
        ip,
        userAgent,
        isValid: true,
        user: user._id
    })
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user:tokenUser, refreshToken})
    res.status(StatusCodes.OK).json({user: tokenUser})
}
const logout = async(req, res)=>{
    await Token.findOneAndDelete({user:req.user.userId})

    res.cookie('accessToken', '', {
        httpOnly: true,
        maxAge: 0
    })
    res.cookie('refreshToken', '', {
        httpOnly: true,
        maxAge: 0
    })
    res.status(StatusCodes.OK).json({msg:'User logged out'})
}
const verifyEmail = async(req, res)=>{
    const {email, verificationToken} = req.body

    if(!email || !verificationToken){
        throw new CustomError.BadRequestError('Invaild credentials')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new CustomError.NotFoundError('invalid credentials')
    }
    
    user.verificationToken = null
    user.isVerified = true
    user.verified = new Date(Date.now())
    await user.save()

    res.status(StatusCodes.OK).json({msg:'Account verified'})
}
const forgotPassword = async(req, res)=>{
    const {email} = req.body
    if(!email){
        throw new CustomError.BadRequestError('Please provide an email')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError.NotFoundError(`No account found with - ${email}`)
    }

    const origin = 'http://localhost:3000'
    const passwordToken = crypto.randomBytes(40).toString('hex')
    
    const oneDay = 1000 * 60 * 30
    user.passwordToken = createHash(passwordToken)
    user.passwordTokenExpiration = new Date(Date.now() + oneDay)
    await user.save()

    await sendPasswordResetEmail({name:user.name, email, passwordToken, origin})
    res.status(StatusCodes.OK).json({msg: 'Password reset instruction is sent to your email'})
}
const resetPassword = async(req, res)=>{
    const {password, email, token} = req.body

    if(!password || !email || !token){
        throw new CustomError.BadRequestError('invalid credentials')
    }
    
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError.NotFoundError('Invalid credentials')
    }
    const currentDate = new Date()
    if(
        user.passwordToken !== createHash(token) || 
        currentDate > user.passwordTokenExpiration
    ){
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }

    user.password = password
    await user.save()

    res.status(StatusCodes.OK).json({msg:'Password reset successfully'})

}

module.exports = {
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword       
}