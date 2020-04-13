const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({error: 'name missing'})
    }

    if (!body.number) {
        return res.status(400).json({error: 'number missing'})
    }

    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }
    
    const person = {
        number: body.number,
        name: body.name,
        id: Math.floor(Math.random() * 10000)
    }

    persons = persons.concat(person)

    res.json(body)
})


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)