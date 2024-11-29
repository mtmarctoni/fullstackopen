const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs',
        { title: 1, author: 1, url: 1, likes: 1
        }
    )
    res.json(users)
})

userRouter.post('/', async (req, res) => {
    const { userName, name, password } = req.body
    
    if (!userName || !password) {
        return res.status(400).json({ error: 'username and password are required' })
    }
    if (password.length < 3) {
        return res.status(400).json({
            error: 'password must be at least 3 characters'
        })
    }
    
    const existingUser = await User.findOne({
        userName
    })
    if (existingUser) {
        return res.status(400).json({ error: 'username already exists' })
    }
    
    const passwordHash = await bcrypt.hash(password, 10)
    
    const user = new User({
        userName,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = userRouter