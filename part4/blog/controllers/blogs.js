const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { decodeToken } = require('../utils/middlewares')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  res.json(blogs)
  
})
  
blogRouter.post('/', decodeToken, async (req, res) => {
  const { title, author, url } = req.body
  const decodedToken = req.decodedToken

  if (!title || !author || !url) {
    return res.status(400).json({
      error: 'title, author and url are required'
    })
  }  

  if (!req.body.likes) req.body.likes = 0

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title,
    author,
    url,
    likes: req.body.likes,
    user: user._id
  })
  const blogSaved = await blog.save()

  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()

  res.status(201).json(blogSaved)
  
})

blogRouter.delete('/:id', decodeToken, async (req, res) => {
  const { id } = req.params
  const userId = req.decodedToken.id
  const blog = await Blog.findById(id)

  if (userId !== blog.user.toString()) {
    return res.status(403).json({ error: 'only the creator of the blog can delete it' })
  }
  
  await Blog.findByIdAndDelete(id)
  await User.findByIdAndUpdate(userId, { $pull: { blogs: id } })
  res.status(204).end()
})



blogRouter.put('/:id', decodeToken, async (req, res) => {
  const { id } = req.params
  const { title, author, url, likes } = req.body
  const blog = {
    title
  }
  if (title) blog.title = title
  if (author) blog.author = author
  if (url) blog.url = url
  if (likes) blog.likes = likes
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true
  })
  res.status(200).json(updatedBlog)

})

module.exports = blogRouter