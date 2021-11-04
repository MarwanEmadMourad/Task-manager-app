const mongoose = require('mongoose')
const validator = require('validator')

// creating user model 
const User = mongoose.model('User', {
    name: {
        type:String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true ,
        minLength: 7,
        validate (value) {
            if (value.toLowerCase().includes('password') === true){
                throw new Error ('Password can not contain the word "password"')
            }
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        validate (value) {
            if (!validator.isEmail(value)){
                throw new Error ('Enter a valid email.')
            }
        }
    },
    age: {
        type: Number ,
        default: 0 ,
        validate (value) {
            if (value < 0) {
                throw new Error ('Age must be positive')
            }
        }
    }
})

module.exports = User