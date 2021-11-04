const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 

app.use(express.json())

// creating a new user
app.post('/users' , (req,res) =>{
    const user = new User(req.body)

    user.save().then(() =>{
        // res.send('User registered Successfully')
        res.status(201).send(user)
    }).catch((error) =>{
        res.status(400).send(error)
    })
})

// reading all users
app.get('/users',(req,res) =>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error) =>{
        res.status(500).send(error)
    })
})

// reading a user by id
app.get("/users/:id",( (req,res) =>{
    const _id = req.params.id 

    User.findById(_id).then((user) =>{
        res.status(200).send(user)
    }).catch( (error) =>{
        res.status(500).send("Cannot Find user")
    })
}))

// creating a new task
app.post('/tasks' , (req,res) =>{
    const task = new Task(req.body)

    task.save().then(() =>{
        // res.send('Task registered Successfully')
        res.status(201).send(task)
    }).catch((error) =>{
        res.status(400).send(error)
    })  
})

// reading all tasks
app.get('/tasks',(req,res) =>{
    Task.find({}).then((tasks) =>{
        res.send(tasks)
    }).catch((error) =>{
        res.status(500).send()
    })
})

// reading a task by it's id
app.get('/tasks/:id' , (req,res) =>{
    const _id = req.params.id 

    Task.findById(_id).then((task) =>{
        res.send(task)
    }).catch(()=>{
        res.status(404).send("cannot find the task")
    })
})

app.listen(port , () =>{
    console.log('Server is up on port '+port)
})
