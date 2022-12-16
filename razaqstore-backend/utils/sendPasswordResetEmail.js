const sendEmail = require("./sendEmal")

const sendPasswordResetEmail = ({name, email, passwordToken, origin})=>{
    const url = `${origin}/account/user/reset-password?token=${passwordToken}&email=${email}`
    const message = '<p>Please click the link below to reset your password</p>'

    return sendEmail({
        to: email,
        subject: `Hello ${name}`,
        html: `
            Password reset instruction
            ${message}
            <a href="${url}">Reset password</a>
        `
    })
}

module.exports = sendPasswordResetEmail