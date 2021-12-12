const sgMail = require('@sendgrid/mail')
const sendGridApiKey = require('./apiKey')

sgMail.setApiKey(sendGridApiKey)

sgMail.send({
    from:'marwanemad36@gmail.com',
    to:'Marwanalghandour@yahoo.com',
    subject:'Urgent !!',
    text:'Take care of that indentaion bro'
})