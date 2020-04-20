const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

/*eslint-disable */
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('connected to MongoDb')
  })
  .catch(error => {
    console.log('error connecting to MongoDb', error.message)
  })
/* eslint-enable */

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)