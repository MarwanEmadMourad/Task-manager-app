const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

// creating user model 
const User = mongoose.model('User', {
    name: {
        type:String
    },
    age: {
        type: Number
    }
})

const me = new User( { name :'Marwan' , age : 22} )

me.save().then((data) =>{
    console.log(data)
}).catch((error) =>{
    console.log(error)
}) 


// creating task model
const Task = mongoose.model('Task',{
    description:{
        type: String
    },
    completed:{
        type: Boolean
    }
})

const myTask = new Task({description: 5 , completed: 'djkdshfjks'})

myTask.save().then((data) =>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})