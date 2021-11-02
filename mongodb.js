// $ git push -u origin main

// object destructing
const {MongoClient , ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{ useNewUrlParser:true } , (error,client) =>{
    if (error){
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)
    
    // updating the db using promises and update one
    db.collection('Tasks').updateOne( { description : 'Play Tennis' } ,
    {
        $set: {
            description:'Do Some Shit'
        }
    }).then((data) =>{
        console.log(data)
    }).catch((error) =>{
        console.log(error)
    })

    // updating the db using promises and update many
    db.collection('Tasks').updateMany( { completed:false } , {
        $set: {
            completed:true
        }
    }).then((data) =>{
        console.log(data)
    }).catch((error) =>{
        console.log(error)
    })

})
