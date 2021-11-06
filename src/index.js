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

// updating a user by id
app.patch('/users/:id' , async (req,res) =>{
    
    // checking if it's allowed to update the incoming properties
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email','password','age','name']
    
    const isValidUpdate = updates.every( (update) => allowedUpdates.includes(update) )
    
    if (!isValidUpdate){
        return res.status(400).send("No document found with these properties")
    }

    const _id = req.params.id 
    const data = req.body
    try {
        const user = await User.findByIdAndUpdate( _id , data , { new:true , runValidators:true })
        res.status(201).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
})

// deleting user by id
app.delete('/users/:id' , async (req,res) =>{
    const _id = req.params.id

    try {
        const user = await User.deleteOne({ id:_id })
        
        if (!user.deletedCount) {
            return res.status(404).send("Cannot find a user with this id")
        }
        res.status(201).send("User deleted successfully")
    } catch (error) {
        res.status(400).send(error)
    }
})

/******************************************************************************************************/

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
        res.status(201).send()
    } catch (error) {
        res.status(404).send("cannot find the task")
    }
})

// updating task by id 
app.patch('/tasks/:id' , async (req,res) =>{

    // checking if it's allowed to update the incoming properties
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    
    const isValidUpdate = updates.every( (update) => allowedUpdates.includes(update) )
    
    if (!isValidUpdate){
        return res.status(404).send("No document found with these properties")
    }

    const _id = req.params.id 
    const data = req.body

    try {
        const task = await Task.findByIdAndUpdate(_id,data,{ new:true , runValidators:true}) 
        res.status(201).send(task)    
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// deleting task by id 
app.delete('/tasks/:id' , async (req,res) =>{
    const _id = req.params.id

    try {
        const task = await Task.deleteOne({ id:_id })
        
        if (!task.deletedCount) {
            return res.status(404).send("Cannot find a task with this id")
        }
        res.status(201).send("Task deleted successfully")
    } catch (error) {
        res.status(400).send(error)
    }
})


app.listen(port , () =>{
    console.log('Server is up on port '+ port)
})
