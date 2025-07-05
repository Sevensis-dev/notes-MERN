const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
dotenv.config()

const noteRoutes = require('./routes/noteRoutes')
app.use(cors())
app.use(express.json())
app.use('/api', noteRoutes)
const start = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log('mongodb connected'))

        app.listen(process.env.PORT, ()=>{
            console.log('server started')
        })
    }
    catch(e){
        console.log(e)
    }


}

start()