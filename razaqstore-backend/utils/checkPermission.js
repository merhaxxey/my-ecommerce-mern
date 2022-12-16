const CustomError = require("../errors/")

const checkPermission = (requestUserId, resourceId)=>{
    if(requestUserId.userId === resourceId.toString()) return
    if(requestUserId.role === 'admin') return

    throw new CustomError.UnauthorizedError('Permission denied')
}

module.exports = checkPermission