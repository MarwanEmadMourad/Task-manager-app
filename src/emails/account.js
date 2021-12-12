const sgMail = require('@sendgrid/mail')
const sendGridApiKey = require('./apiKey')

sgMail.setApiKey(sendGridApiKey)

const sendWelcomeMail = (email,name) => {
    sgMail.send({
        from:'marwanemad36@gmail.com',
        to:email,
        subject:'Welcome On board.',
        text:`We are happy to have you with us ${name}`
    })
}

module.exports = {
    sendWelcomeMail
}