const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    const sum = likes.reduce((a, b) => a + b, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
    const favorite = blogs.find((blog) => blog.likes === maxLikes)
    return favorite
}

const mostBlogs = (blogs) => {
    const authorBlogs = blogs.reduce((acc, blog) => {
        //console.log('acc: ', acc)
        if (!acc[blog.author]) {
            acc[blog.author] = 1
        } else acc[blog.author]++
        return acc
    }, {})

    const maxBlogs = Math.max(...Object.values(authorBlogs))
    const mostBlogsAuthor = Object.keys(authorBlogs).find(
        (author) => authorBlogs[author] === maxBlogs
    )
    return { author: mostBlogsAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((acc, blog) => {
        if (!acc[blog.author]) {
            acc[blog.author] = blog.likes
        } else acc[blog.author] += blog.likes
        return acc
    }, {})
    const maxLikes = Math.max(...Object.values(authorLikes))
    const mostLikesAuthor = Object.keys(authorLikes).find(
        (author) => authorLikes[author] === maxLikes
    )
    return { author: mostLikesAuthor, likes: maxLikes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
