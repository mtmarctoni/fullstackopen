import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { likeBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = ({ isLogged }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const loginUser = useSelector((state) => state.loginUser)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    if (blog) setLikes(blog.likes)
  }, [blog])

  if (!blog) {
    return null
  }

  const hidenWhenLogoutStyle = {
    display: isLogged ? '' : 'none',
  }

  const handleLike = async () => {
    const newBlog = { ...blog, likes: likes + 1 }
    dispatch(likeBlog(blog.id, newBlog, loginUser.token))
    setLikes(likes + 1)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{blog.title}</h1>
      <p className="text-gray-600 mb-4">by {blog.author}</p>
      <div className="mb-4">
        <a
          href={blog ? blog.url : ''}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {blog.url}
        </a>
      </div>
      <div className="flex items-center mb-4">
        <span className="mr-2">{likes} likes</span>
        <button
          onClick={handleLike}
          style={hidenWhenLogoutStyle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          like
        </button>
      </div>
      <p className="text-gray-600 mb-6">Added by {blog.user.name}</p>
      <Comments isLogged={isLogged} />
    </div>
  )
}

export default Blog
