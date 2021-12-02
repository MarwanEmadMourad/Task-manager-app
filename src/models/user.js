const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true ,
        minLength: 7,
        validate (value) {
            if (value.toLowerCase().includes('password') === true){
                throw new Error ('Password can not contain the word "password"')
            }
        }
    },
    email:{
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowerCase: true,
        validate (value) {
            if (!validator.isEmail(value)){
                throw new Error ('Enter a valid email.')
            }
        }
    },
    age: {
        type: Number ,
        default: 0 ,
        validate (value) {
            if (value < 0) {
                throw new Error ('Age must be positive')
            }
        }
    } , 
    tokens: [{
        token:{
            type: String ,
            required: true
        }
    }] 
})

// generating an auth token to each individual user
userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({ id : user._id.toString() } , "haytherebaby")

    user.tokens = user.tokens.concat({token})

    await user.save()
    return token
}

// getting public user data
userSchema.methods.getPublicUser = function () {
    const user = this 
    return {
        name : user.name ,
        email: user.email ,
        age: user.age
    }
}


// customizing our own function on the User model to authenticate a user 
userSchema.statics.findByCredetials = async (email,password) => {
    const user = await User.findOne({ email })
    if (!user){
        throw new Error ("Unable to login")
    }
    const validLogin = await bcrypt.compare(password,user.password)  
    if (!validLogin){
        throw new Error ("Email or password is incorrect")
    } 
    return user
}

// Hash any password before saving it 
userSchema.pre('save' , async function (next) {
    const user = this 
    // checking if the password property on user is being changed(created or updated) then we want to hash it
    if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

// creating user model 
const User = mongoose.model('User',userSchema)

module.exports = User
