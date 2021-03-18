const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// route specific middleware for jwt auth
const authLockedRoute = async (req, res, next) => {
    try {
        // find an incoming jwt token
        const authHeader = req.headers.authorization

        // try to decode it - if it fails will throw to cathc
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET)

        // find the user from the db
        const foundUser = await User.findById(decode.id)
        // mount the user on res.locals
        res.locals.user = foundUser
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'auth failed' })
    }
}
module.exports = authLockedRoute