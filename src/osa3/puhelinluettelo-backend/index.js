require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :status type :type'));

const cors = require('cors')

app.use(cors())

app.use(express.static('dist'))

const mongoose = require('mongoose')
const Person = require('./models/person')

app.get('/', (request, response) => {
    response.send('<h1>This is Phonebook backend</h1>')
})

app.get('/info', (request, response) => {
    const now = new Date();
    response.send('Phonebook has info for ' + persons.length + ' persons <br\> <br\>' + now)

})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
      })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id

    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 10 ** 16) + ''
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(request.headers)
    console.log("body", body)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    const first = persons.find(p => p.name === body.name)
    if (first) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})