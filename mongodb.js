// $ git push -u origin main
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL,{ useNewUrlParser:true } , (error,client) =>{
    if (error){
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)
    
    db.collection('Tasks').insertMany([{
        description:'' ,
        completed:false 
    },{
        description:'' ,
        completed:false     
    },{
        description:'' ,
        completed:false 
    }],(error,result) =>{
        if (error){
            return console.log('Unable To insert Documents')
        } 
        // console.log(result)
    })
})
