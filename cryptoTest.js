const bcrypt = require('bcrypt')

const testCrypto = async () => {
    try {
        const password = 'banana'
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log('hashed password', hashedPassword)

        const matchPassword = await bcrypt.compare('banana', hashedPassword)
        console.log('matchedPasswords:', matchPassword)
        process.exit()
    } catch (err) {
        console.log(err)
    }
}
testCrypto()