const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()


// creating a new task
router.post('/tasks' , auth ,async (req,res) =>{
    const task = new Task({
        ...req.body ,
        creator:req.user.id 
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// reading all tasks
router.get('/tasks',async  (req,res) =>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

// reading a task by it's id
router.get('/tasks/:id' ,async  (req,res) =>{
    const _id = req.params.id 
    try {
        const task = await Task.findById(_id) 
        res.status(201).send()
    } catch (error) {
        res.status(404).send("cannot find the task")
    }
})

// updating task by id 
router.patch('/tasks/:id' , async (req,res) =>{

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
router.delete('/tasks/:id' , async (req,res) =>{
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

module.exports = router