const testRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const { initialBlogsJSON } = require('../tests/helper_test')

testRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})

testRouter.post('/add-blogs', async (req, res) => {
    await Blog.insertMany(initialBlogsJSON)

    res.status(204).end()
})

module.exports = testRouter
