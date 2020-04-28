const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDb')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDb', err.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})