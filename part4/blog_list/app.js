require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const MONGODB_URL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL
mongoose.connect(MONGODB_URL)

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)


app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app