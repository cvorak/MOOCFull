require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static("build"))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]


app.get('/info', (req, res) => {
    const numOfPeople = persons.length
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(p => {
        if (p) {
            res.json(p.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(res => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ error: 'name missing' })
    }

    if (!body.number) {
        return res.status(400).json({ error: 'number missing' })
    }

    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({
        number: body.number,
        name: body.name,
    })

    person.save().then(savedPeson => {
        res.json(savedPeson.toJSON())
    })
})

app.put('/api/persons/:id', (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    }

    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)