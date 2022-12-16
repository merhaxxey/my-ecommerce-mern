const sendEmail = require("./sendEmal")

const sendEmailVerification = ({name, email, verificationToken, origin})=>{
    const verificationUrl = `${origin}/account/user/verify-email?token=${verificationToken}&email=${email}`

    return sendEmail( {
        to: email,
        subject: 'Password verification',
        html: `
            <h1>Hello ${name}</h1>
            <p>Please click the link below to confirm your email</p>
            <a href='${verificationUrl}'>Confirm email</a>
        `
    })
}
module.exports = sendEmailVerification