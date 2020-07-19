const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginrouter = require('./controllers/login')
const loginRouter = require('./controllers/login')
const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDb')
    })
    .catch((err) => {
        logger.error('error connecting to MongoDb', err.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app 