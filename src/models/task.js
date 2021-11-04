const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = Task