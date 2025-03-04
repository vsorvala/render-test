const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://velimattisorvala:${password}@cluster0.tbfyh.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true,
})

const note2 = new Note({
    content: 'HTML is easy 2',
    important: true,
})

const note3 = new Note({
    content: 'HTML is easy 2',
    important: false,
})

const notes = [note, note2, note3]
/*
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})

Note.insertMany(notes).then(result => {
    console.log('notes saved!')
    mongoose.connection.close()
})
*/

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
