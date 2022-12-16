const jwt = require('jsonwebtoken')

const createJWT = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET)
}

const isTokenValid = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
}

const attachOneCookieToResponse = ({res, token, name})=>{
    const tokenJWT = createJWT({token})
    res.cookie(name, tokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        maxAge: 1000 * 60*60*24*30
    })
}

const attachCookiesToResponse = ({res, user, refreshToken})=>{
    const accessTokenJWT = createJWT({user})
    const refreshTokenJWT = createJWT({user, refreshToken})

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        maxAge: 1000 * 60 * 60 
    })
    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        maxAge: 1000 * 60 * 60 * 30
    })
}

module.exports = {isTokenValid, attachCookiesToResponse, attachOneCookieToResponse}