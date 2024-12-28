const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test("when list has only one blog equals that blog's likes", () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0,
            },
        ]
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 5)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(biggerList)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {
    test('returns the blog with most likes', () => {
        const result = listHelper.favoriteBlog(biggerList)
        assert.deepStrictEqual(result, mostLikesBlog)
    })
})

describe('most blogs', () => {
    test('returns the author with most blogs', () => {
        const result = listHelper.mostBlogs(biggerList)
        assert.deepStrictEqual(result, mostBlogsAuthor)
    })
})

describe('most likes', () => {
    test('returns the author with most likes', () => {
        const result = listHelper.mostLikes(biggerList)
        assert.deepStrictEqual(result, mostLikesAuthor)
    })
})

const biggerList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422aa714567676234d17f8',
        title: 'awsome title',
        author: 'mtmarctoni +',
        url: 'https://example1.com/pdf',
        likes: 10,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a6h6id5d17f8',
        title: 'WOW',
        author: 'UNKNOWN NON',
        url: 'https://nowhere.com',
        likes: 15,
        __v: 0,
    },
    {
        _id: '5a654aa714567676234d17f8',
        title: 'awsome title 2',
        author: 'mtmarctoni +',
        url: 'https://example2.com/pdf',
        likes: 2,
        __v: 0,
    },
    {
        _id: '5a422fu5y4567676234d17f8',
        title: 'awsome title 3',
        author: 'mtmarctoni +',
        url: 'https://example3.com/pdf',
        likes: 4,
        __v: 0,
    },
]

const mostLikesBlog = biggerList[2]
const mostBlogsAuthor = { author: 'mtmarctoni +', blogs: 3 }
const mostLikesAuthor = { author: 'mtmarctoni +', likes: 16 }
