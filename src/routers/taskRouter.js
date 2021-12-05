const express = require('express')
const Task = require('../models/task')
const User = require('../models/user')

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

// reading all the account tasks
// filtering based on completed property
// can paginate using limit and skip query strings
router.get('/tasks', auth ,async  (req,res) =>{
    const match = {}
    if (req.query.completed)
        match.completed = (req.query.completed === 'true')
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        })
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// reading a task for a single user by it's id
router.get('/tasks/:id' , auth ,async  (req,res) =>{
    const _id = req.params.id 
    try {
        const task = await Task.findOne({ _id , creator:req.user._id })
        if (!task){
            res.status(404).send()    
        } 
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send()
    }
})

// updating task by id 
router.patch('/tasks/:id' , auth , async (req,res) =>{

    // checking if it's allowed to update the incoming properties
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    
    const isValidUpdate = updates.every( (update) => allowedUpdates.includes(update) )
    
    if (!isValidUpdate){
        return res.status(404).send("No document found with these properties")
    }
    
    try {
        const task = await Task.findOne({_id: req.params.id , creator: req.user._id})
        updates.forEach((update) => task[update] = req.body[update] ) 
        await task.save()

        res.status(201).send(task)    
    } catch (error) {
        res.status(404).send(error)
    }
})

// deleting task by id 
router.delete('/tasks/:id' ,auth, async (req,res) =>{
    const _id = req.params.id

    try {
        const task = await Task.findOne({ id:_id , creator: req.user._id })
        await task.remove()
        res.status(201).send("Task deleted successfully")
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router