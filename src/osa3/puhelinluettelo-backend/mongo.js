const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const puhnro = process.argv[4]

const url =
    `mongodb+srv://velimattisorvala:${password}@cluster0.tbfyh.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: puhnro,
})
/*
const note2 = new Note({
    content: 'HTML is easy 2',
    important: true,
})

const note3 = new Note({
    content: 'HTML is easy 2',
    important: false,
})

const notes = [note, note2, note3]
*/
if (name !== undefined && puhnro !== undefined) {
    person.save().then(result => {
        console.log(result)
        console.log(`added ${name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
else if (name === undefined && puhnro === undefined) {
    console.log("phonebook")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()

    })
}
else { mongoose.connection.close() }
/*
Note.insertMany(notes).then(result => {
    console.log('notes saved!')
    mongoose.connection.close()
})


Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
*/
