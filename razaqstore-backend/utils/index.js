const createTokenUser = require('./createTokenUser')
const sendEmailVerification = require('./sendEmailVerification')
const {attachCookiesToResponse, isTokenValid} = require('./jwt')
const createHash = require('./createHash')
const checkPermission = require('./checkPermission')

module.exports = {
    createTokenUser,
    sendEmailVerification,
    attachCookiesToResponse, 
    isTokenValid,
    createHash,
    checkPermission
}