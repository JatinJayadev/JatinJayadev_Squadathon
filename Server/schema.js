const mongoose = require('mongoose')

const toDoData = new mongoose.Schema({
    Todo: String
})

const data = mongoose.model('todoData', toDoData)

module.exports = data