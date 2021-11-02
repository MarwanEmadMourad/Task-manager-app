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
    
    // finding one element (task with description equals Play Chess)
    db.collection('Tasks').findOne({ description:'Play Chess'} , (error,task) =>{
        if (error) {
            return console.log("Unable to find task")
        }

        console.log(task)
    })

    // finding all tasks with completed property equal true
    db.collection('Tasks').find({completed : false}).toArray((error,tasks) =>{
        console.log(tasks)
    })

    // getting the document count of documents with false completed property
    db.collection('Tasks').find({completed : false}).count((error,count) =>{
        console.log(count)
    })
})
