const { test, after, describe, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')
const app = require('../app')
const { initialBlogsJSON, initialUsersJSON } = require('./helper_test')

const api = supertest(app)

let token
let headers
let userId

before(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsersJSON)
    const user = await User.findOne({ userName: initialUsersJSON[0].userName })
    userId = user ? user._id.toString() : null

    const userForToken = {
        userName: initialUsersJSON[0].userName,
        id: userId,
    }

    token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 }) // 1 hour
    headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogsJSON)
})

describe('api works', () => {
    test('blogs are returned as a json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns the correct amounts of blogs', async () => {
        const res = await api.get('/api/blogs')
        assert.strictEqual(res.body.length, initialBlogsJSON.length)
    })

    test('unique identifier is defined as "id" and not "_id"', async () => {
        const res = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert(res.body[0].id)
    })
})

describe('create new blog', () => {
    test('new blog is successfully saved in the database', async () => {
        const newBlog = {
            title: 'New blog',
            author: 'New author',
            url: 'https://newblog.com',
            likes: 100,
        }

        await api.post('/api/blogs').set(headers).send(newBlog).expect(201)

        const finalBlogs = await Blog.find({})
        assert.strictEqual(initialBlogsJSON.length + 1, finalBlogs.length)
        const blogAdded = await Blog.findOne({ title: 'New blog' })
        //assert(blogAdded)
        assert.strictEqual(blogAdded.user.toString(), userId)
    })

    // implement feature in app
    test('set likes to 0 if not provided', async () => {
        const newBlog = {
            title: 'New awful blog',
            author: 'Bad author',
            url: 'https://blogwithoutlikes.com',
        }

        const res = await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(201)

        assert.strictEqual(res.body.likes, 0)
    })

    // implement feature in app
    test('returns bad request if title is missing', async () => {
        const newBlog = {
            author: 'Bad author',
            url: 'https://blogwithouttitle.com',
        }

        const res = await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(400)

        //console.log(JSON.parse(res.text).error)
        assert.strictEqual(
            JSON.parse(res.text).error,
            'title, author and url are required'
        )
    })

    // implement feature in app
    test('returns bad request if url is missing', async () => {
        const newBlog = {
            author: 'Bad author',
            title: 'i have no url',
        }

        const res = await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(400)

        assert.strictEqual(
            JSON.parse(res.text).error,
            'title, author and url are required'
        )
    })
})

describe('delete a blog', () => {
    test('a blog is deleted from the database with status 204', async () => {
        const id = initialBlogsJSON[0]._id
        const title = initialBlogsJSON[0].title

        await api.delete(`/api/blogs/${id}`).set(headers).expect(204)

        const finalBlogs = await Blog.find({})
        assert.strictEqual(initialBlogsJSON.length - 1, finalBlogs.length)

        assert(!finalBlogs.map((blogs) => blogs.title).includes(title))
    })
})

describe('update a blog', () => {
    test('returns the updated blog with status 200', async () => {
        const blogToUpdate = initialBlogsJSON[0]
        const newLikes = 333

        await api
            .put(`/api/blogs/${blogToUpdate._id}`)
            .set(headers)
            .send({
                likes: newLikes,
            })
            .expect(200)

        const upadatedBlog = await Blog.findById(blogToUpdate._id)

        assert.strictEqual(upadatedBlog.likes, newLikes)
    })
})

describe('invalid token', () => {
    test('returns 401 Unauthorized if token not provided', async () => {
        const id = initialBlogsJSON[0]._id
        await api.delete(`/api/blogs/${id}`).expect(401)
    })
    test('returns 401 Unauthorized if token is invalid', async () => {
        const id = initialBlogsJSON[0]._id
        const invalidToken = 'invalidtoken'
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${invalidToken}`)
            .expect(401)
    })
})

after(async () => {
    await mongoose.connection.close()
})
