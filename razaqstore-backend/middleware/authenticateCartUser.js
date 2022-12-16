const Token = require("../model/Token")
const { isTokenValid, attachCookiesToResponse } = require("../utils")
const CustomError = require('../errors')

const authenticateCartUser = async(req, res, next)=>{
    const {refreshToken, accessToken} = req.signedCookies

    if(accessToken){
        const payload = isTokenValid(accessToken)
        req.user = {...payload.user}
        return next()
    }
    if(!refreshToken){
        const cartCookie = req.signedCookies['rm-c']
        if(cartCookie){
            const payload = isTokenValid(req.signedCookies['rm-c'])
            req.token = payload.token
        }
        return next()
    }
    const payload = isTokenValid(refreshToken)

    const existingToken = await Token.findOne({
        user: payload.user.userId,
        refreshToken:payload.refreshToken
    })
    
    if(!existingToken ){
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }

    attachCookiesToResponse({res, user:payload.user, refreshToken:existingToken.refreshToken})
    req.user = {...payload.user, refreshToken:payload.refreshToken}
    next()
}

module.exports = {
    authenticateCartUser
}