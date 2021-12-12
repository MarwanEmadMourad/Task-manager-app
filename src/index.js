const express = require('express')
require('./db/mongoose')
const result = require('dotenv').config()

// debugging enviroment variables
// if (result.error) {
//     throw result.error
// }  
// console.log(result.parsed)

// App Routers
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

const app = express()
const port = process.env.PORT 


app.use(express.json()) 
app.use(userRouter)
app.use(taskRouter)


app.listen(port , () =>{
    console.log('Server is up on port '+ port)
})
