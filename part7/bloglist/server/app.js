const { MONGO_DB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const {
    unknownEndpoint,
    errorHandler,
    logRequest,
    getAuthToken,
} = require('./utils/middlewares')
const app = express()

//console.log(MONGO_DB_URI)
info(`Connecting to MongoDB`)

mongoose
    .connect(MONGO_DB_URI)
    .then(() => {
        info('Connected to MongoDB')
    })
    .catch((err) => {
        error('Error connecting to MongoDB:', err.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(logRequest)
app.use(getAuthToken)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
