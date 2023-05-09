require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/router')
const auth = require('./controller/auth.controller')
const cookieParser = require('cookie-parser')

const DB = process.env.DB
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(DB)
        connect && console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
}
dbConnect()

app.use('/', routes)
app.post('/refresh-token', auth.handleRefreshToken)
app.listen(PORT, () => console.log(`Listening to PORT:${PORT} 🚀🔥`))