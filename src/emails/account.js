const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

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