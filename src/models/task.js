const mongoose = require('mongoose')
const validator = require('validator')

// creating task model
const Task = mongoose.model('Task',{
    description:{
        type: String,
        trim: true,
        required:true ,
    },
    completed:{
        type: Boolean,
        default: false
    } ,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true ,
        ref: 'User'
    }
})

module.exports = Task