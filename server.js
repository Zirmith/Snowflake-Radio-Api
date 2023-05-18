const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || randomPort({
    allowClosePorts: false,
})


var users = []

const app = express()
app.use(cors())
app.use(express.json())

