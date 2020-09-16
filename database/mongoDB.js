const mongoose = require('mongoose')
require('dotenv').config()



console.log("databastest körs")

let mongoDatabase

    const {MongoMemoryServer} = require('mongodb-memory-server')
    mongoDatabase = new MongoMemoryServer()
    mongoDatabase = {
        // mongodb+srv://user:password@host/dbname
        getUri: async () => 
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    }




async function connect(){
    console.log("connect")
    let uri = await mongoDatabase.getUri()

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect(){
    console.log("disconnect")
    if(process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development'){
        await mongoDatabase.stop()
    }
    await mongoose.disconnect()
}


module.exports = {
    connect, disconnect
}