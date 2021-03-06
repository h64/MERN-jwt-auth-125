// Required Packages
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./models')

// Configure Express App
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// Middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const middleware = (req, res, next) => {
    console.log('hello from a middleware function')
    next()
}
app.use(middleware)

// Controllers
app.use('/api-v1/users', require('./controllers/api-v1/userController'))

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'hello world! 🤖' })
})

// Start Server Listen
app.listen(PORT, () => {
    rowdyResults.print()
    console.log('Server listening on port:', PORT)
})