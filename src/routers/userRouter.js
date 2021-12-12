const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')
const sharp = require('sharp')
const {sendWelcomeMail} = require('../emails/account')

const router = new express.Router()


// (Public) creating a new user
router.post('/users' , async (req,res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeMail(user.email,user.name)
        const token = await user.generateAuthToken()   
        res.status(201).send( { user: user.getPublicUser() , token} )    
    } catch(error){
        res.status(400).send(error)
    }
})

//(Public) login route
router.post('/users/login' , async (req,res) =>{
    try {
        const user = await User.findByCredetials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()  
        res.send( {user: user.getPublicUser() , token} )
    } catch(error){
        res.status(400).send(error.message)
    }
})

//(Private) logout route
router.post('/users/logout' , auth , async (req,res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        }) 
        await req.user.save()
        res.send()
    } catch(error){
      res.status(500).send()
    }
})

//(Private) logout from all sessions
router.post('/users/logout-all' , auth , async (req,res) =>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(error){
      res.status(500).send()
    }
})

//(Private) reading my profile 
router.get('/users/me', auth , async (req,res) => {
    res.status(200).send(req.user.getPublicUser())
})

//(Private) Updating my account's info
router.patch('/users/me' ,auth, async (req,res) =>{
    
    // checking if it's allowed to update the incoming properties
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email','password','age','name']
    
    const isValidUpdate = updates.every( (update) => allowedUpdates.includes(update) )
    
    if (!isValidUpdate){
        return res.status(400).send("No document found with these properties")
    }

    try {
        // since a single update is a stirng we use [] to access user properties 
        updates.forEach((update) => req.user[update] = req.body[update] )
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

//(Private) uploading profile pic route
router.post('/users/me/avatar', auth , upload.single('avatar'), async (req,res) =>{
    const modifiedBuffer = await sharp(req.file.buffer).resize({ width: 250 , height: 250}).png().toBuffer()
    req.user.avatar = modifiedBuffer
    await req.user.save()
    res.send()
} ,(error,req,res,next) => {
    res.status(400).send({error:error.message})
})

//(Private) deleting my avatar's pic
router.delete('/users/me/avatar' , auth ,async (req,res) =>{
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

//(Private) fetching my profile pic 
router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar){
            throw new Error()
        }
        // specifying the response data type
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

//(Private) deleting my account
router.delete('/users/me' , auth ,async (req,res) =>{
    try {
        await req.user.remove()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
