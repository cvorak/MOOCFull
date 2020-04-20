const mongoose = require('mongoose')



if (process.argv.length < 3) {
    console.log('Please enter only password to list entries, password, name and number to save')
}

const password = process.argv[2]
const url = `mongodb+srv://cvorak:${password}@cluster0-lge48.mongodb.net/phonebook?retryWrites=true&w=majority`


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(res => {
        console.log('phonebook:')
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(res => {
        // console.log(res)
        console.log(`added ${res.name} number ${res.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Incorrect number of parameters!')
    mongoose.connection.close()
}








