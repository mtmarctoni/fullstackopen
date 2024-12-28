const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (req, res) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        return res
            .status(400)
            .json({ error: 'username and password are required' })
    }

    const user = await User.findOne({ userName })

    const passwordIsCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordIsCorrect)) {
        return res.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        userName: user.userName,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
    }) // 1 hour

    res.status(200).send({ token, userName: user.userName, name: user.name })
})

module.exports = loginRouter
