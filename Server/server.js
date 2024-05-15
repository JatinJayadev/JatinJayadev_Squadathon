const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const data = require('./schema')
const route = require('./routes')
require("dotenv").config()

app.use(cors())
app.use(express.json())

const URI = process.env.URI
const PORT = 4060

mongoose.connect(URI)
    .then(() => {
        console.log("COnnected to DB")
        app.get('/', (req, res) => {
            res.send('Done!')
        })
    })
    .catch((err) => {
        console.log(err)
    })


app.use('/', route)
app.listen(PORT, () => {
    console.log("Server running on port 4060")
})