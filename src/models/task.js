const mongoose = require('mongoose')
// const validator = require('validator')

// defining task schema
const taskSchema = new mongoose.Schema({
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
},{
    timestamps: true
})

// creating task shcema
const Task = mongoose.model('Task',taskSchema)

module.exports = Task