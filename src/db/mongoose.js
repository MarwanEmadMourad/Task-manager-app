const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

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
    Email:{
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

const me = new User( { password :'dpassword' , Email:" marwanEmad@yahoo.com "} )

me.save().then((data) =>{
    console.log(data)
}).catch((error) =>{
    console.log(error)
}) 


// creating task model
const Task = mongoose.model('Task',{
    description:{
        type: String,
        trim: true,
        required:true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

const myTask = new Task({description: "Do some shit" })

myTask.save().then((data) =>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})