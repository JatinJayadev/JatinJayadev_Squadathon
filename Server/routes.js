const express = require('express')
const app = express()
app.use(express.json())
const data = require('./schema')

app.get('/todo', (req, res) => {
    data.find().
        then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/addTodo', (req, res) => {
    console.log("hello")
    data.create({ Todo: req.body.value })
        .then((result) => {
            console.log(result)
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.put('/updateTodo/:id', (req, res) => {
    const id = req.params.id
    const newTodo = req.body.newValue
    data.findByIdAndUpdate(id, { Todo: newTodo })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

app.delete('/deleteTodo/:id', (req, res) => {
    const id = req.params.id
    data.findByIdAndDelete(id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = app