const express = require('express')
const User = require('../models/user')

const router = new express.Router()


// creating a new user
router.post('/users' , async (req,res) =>{
    const user = new User(req.body)
    try {
        await user.save() 
        res.status(201).send(user)
    } catch(error){
        res.status(400).send(error)
    }
})

// reading all users
router.get('/users', async (req,res) =>{
    
    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send(error)
    }
})

// reading a user by id
router.get("/users/:id", async (req,res) => {
    const _id = req.params.id 

    try {
        const user = await User.findById(_id) 
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("Cannot Find user")
    }
})

// updating a user by id
router.patch('/users/:id' , async (req,res) =>{
    
    // checking if it's allowed to update the incoming properties
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email','password','age','name']
    
    const isValidUpdate = updates.every( (update) => allowedUpdates.includes(update) )
    
    if (!isValidUpdate){
        return res.status(400).send("No document found with these properties")
    }

    const _id = req.params.id 
    try {
        const user = await User.findById( _id)

        // since a single update is a stirng we use [] to access user properties 
        updates.forEach((update) => user[update] = req.body[update] )
        await user.save()
        
        res.status(201).send(user)
    } catch (error) {
        res.status(404).send('User Not Found')
    }
})

// deleting user by id
router.delete('/users/:id' , async (req,res) =>{
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

module.exports = router
