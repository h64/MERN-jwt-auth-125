const router = require('express').Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// GET /users -- test endpoint
router.get('/', async (req, res) => {
    res.json({ msg: 'wow' })
})

// POST /users/register -- CREATE a new user
router.post('/register', async (req, res) => {
    console.log(process.env.JWT_SECRET)
    try {
        // look at req.body and see if email already exists in the db
        const findUser = await User.findOne({
            email: req.body.email
        })
        // if the user is found, return function and respond
        if(findUser) return res.status(400).json({ msg: 'email exists already' })
        // hash the password from the req.body
        const password = req.body.password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        // create a user in the db
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()
        // make a jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        // sign it and send it back
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        res.json({ token })
    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: 'OH NO SERVER ERROR' })
    }
})

// POST /users/login -- validate credentials
router.post('/login', async (req, res) => {
    try {
        // try to find the user in db from the req.body
        const foundUser = await User.findOne({
            email: req.body.email
        })
        const noLoginMessage = 'Incorrect username or password'

        // if the user is not found -- return with a failure status and a message
        if(!foundUser) return res.status(400).json({ msg: noLoginMessage })

        // check the password from the db against the req.body
        const isPasswordMatch = await bcrypt.compare(req.body.password, foundUser.password)

        // if the provided password doesn't match -- return with a failure status
        if(!isPasswordMatch) return res.status(400).json({ msg: noLoginMessage })

        // create jwt token
        const payload = {
            name: foundUser.name,
            email: foundUser.email,
            id: foundUser.id
        }

        // sign the jwt token and send it back
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        res.json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'SERVER ERROR AHHHHH' })
    }
})

// GET /auth-locked -- redirect if a bad token is found
router.get('/auth-locked', async (req, res) => {
    res.json({ msg: 'welcome to the private route' })
})


module.exports = router