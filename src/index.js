const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 

app.use(express.json())

// creating a new user
app.post('/users' , async (req,res) =>{
    const user = new User(req.body)
    try {
        await user.save() 
        res.status(201).send(user)
    } catch(error){
        res.status(400).send(error)
    }
})

// reading all users
app.get('/users', async (req,res) =>{
    
    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send(error)
    }
})

// reading a user by id
app.get("/users/:id", async (req,res) => {
    const _id = req.params.id 

    try {
        const user = await User.findById(_id) 
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("Cannot Find user")
    }
})

// creating a new task
app.post('/tasks' , async (req,res) =>{
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// reading all tasks
app.get('/tasks',async  (req,res) =>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

// reading a task by it's id
app.get('/tasks/:id' ,async  (req,res) =>{
    const _id = req.params.id 
    try {
        const task = await Task.findById(_id) 
        res.send(task)
    } catch (error) {
        res.status(404).send("cannot find the task")
    }
})

app.listen(port , () =>{
    console.log('Server is up on port '+port)
})
