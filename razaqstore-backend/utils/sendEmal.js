const nodemailerConfig = require('./nodemailerConfig')
const nodemailer = require('nodemailer')

const sendEmail = ({to, subject, html})=>{

    const transport = nodemailer.createTransport(nodemailerConfig)
    
    return transport.sendMail({
        from: '<easybuy app - razi@gmail.com>',
        to,
        subject,
        html
    })
}
module.exports = sendEmail