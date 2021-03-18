const router = require('express').Router()
const User = require('../../models/User')

// GET /users -- test endpoint
router.get('/', async (req, res) => {
    res.json({ msg: 'wow' })
})

// POST /users/register -- CREATE a new user
router.post('/register', async (req, res) => {
    res.json({ msg: 'register a user' })
})

// POST /users/login -- validate credentials
router.post('/login', async (req, res) => {
    res.json({ msg: 'login a user' })
})

// GET /auth-locked -- redirect if a bad token is found
router.get('/auth-locked', async (req, res) => {
    res.json({ msg: 'welcome to the private route' })
})


module.exports = router