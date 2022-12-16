const mongoose = require('mongoose')

const connsectDB = (url)=>{
    return mongoose.connect(url)
}
module.exports = connsectDB