require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.static('dist'))
app.use(express.json())
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :status type :type'));

const cors = require('cors')

app.use(cors())



const mongoose = require('mongoose')
const Person = require('./models/person')

app.get('/', (request, response) => {
    response.send('<h1>This is Phonebook backend</h1>')
})

app.get('/info', (request, response) => {
    Person.countDocuments().then(number => {
        const now = new Date();
        response.send('Phonebook has info for ' + number + ' persons <br\> <br\>' + now)

    })
   
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ error: 'name missing' })
    }



    if (!body.number) {
        return response.status(400).json({ error: 'number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    Person.findOne({ name: body.name }).then(person => {
        if (person === null) {
            person.save().then(savedNote => {
                response.json(savedNote)
            })
        }
        else (


            Person.findByIdAndUpdate(person.id, { number: body.number }, { new: true })
                .then(changedPerson => {
                    response.json(changedPerson)
                })
                .catch(error => next(error))
        )
    });
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(changedPerson => {
            response.json(changedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})