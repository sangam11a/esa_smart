const express = require('express')
const app = express()
const path = require('path')
// const Router = require('./routes/routes')
// const {logger} = require('./middleware/logger')
const PORT = process.env.PORT || 3000
const connectDB = require('./config/dbConn')
app.use(express.json())
const router = require('./routes/userRoutes')
const mongoose = require('mongoose')
// const {logEvents} = require('./')
connectDB()

app.use('/',router)
// app.post()
mongoose.connection.once('open',()=>{
    console.log("connected to mongodb")
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

})

