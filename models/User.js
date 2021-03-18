// require mongoose
const mongoose = require('mongoose')

// create the schema
const userSchema = mongoose.Schema({
    name : {
        type: String
    },
    email : {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// create the model and export it
module.exports = User = mongoose.model('users', userSchema)