const jwt = require('jsonwebtoken')

const jwtTest = () => {
    try {
        // create jwt payload
        const payload = {
            name: 'user name',
            id: 'user id',
            email: 'email@gmail.com'
        }
        // sign the jwt payload
        const token = jwt.sign(payload, 'my jwt secret', { expiresIn: 60 * 60 })
        console.log(token)
        // decode and verify jwt
        const decode = jwt.verify(token, 'my jwt secret')
        console.log(decode)
    } catch(err) {
        console.log(err)
    }
}

jwtTest()