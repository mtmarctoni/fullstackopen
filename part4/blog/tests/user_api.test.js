const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {initialUsersJSON} = require('./helper_test')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
      await User.deleteMany({})
      await User.insertMany(initialUsersJSON)
  })

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      userName: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, initialUsersJSON.length + 1)

    const userNames = usersAtEnd.map(u => u.userName)
    assert(userNames.includes(newUser.userName))
  })
})

after(async () => {
    await mongoose.connection.close()
})