require('./models')
const User = require('./models/User')

const userTest = async () => {
    try {
        // CREATE a user
        const newUser = new User({
            name: 'bing',
            email: 'bing@bang.com',
            password: 'bingbang'
        })
        await newUser.save()
        console.log('newUser', newUser)
        
        // READ a user
        const foundUser = await User.findOne({
            name: newUser.name
        })
        console.log('foundUser', foundUser)

        // UPDATE a user
        foundUser.name = 'foo'
        await foundUser.save()
        const updatedUser = User.findOne({
            name: 'foo'
        })
        console.log('updatedUser', updatedUser)

        // DESTROY a user
        const deletedUser = await User.deleteOne({
            name: 'foo'
        })
        console.log('deletedUser', deletedUser)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

userTest()
