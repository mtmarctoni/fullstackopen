const { MONGO_DB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const {info, error} = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { 
  unknownEndpoint,
  errorHandler,
  logRequest,
  getAuthToken
} = require('./utils/middlewares')
const app = express()

//console.log(MONGO_DB_URI)
info(`Connecting to MongoDB`) 

mongoose.connect(MONGO_DB_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch((error) => {
    error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(logRequest)
app.use(getAuthToken)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app