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
    
    // deleting a document from db using promises and delete one
    db.collection('Tasks').deleteOne( { description : "Complete node course" } ).then((data) =>{
        console.log(data)
    }).catch((error) =>{
        console.log(error)
    })

})
