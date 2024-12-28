import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeBlog, likeBlog } from '../reducers/blogReducer'
import {createNotification} from '../reducers/notificationReducer'

const BlogElement = ({ blog, isLogged }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loginUser)

  const [isVisible, setIsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hidenWhenLogoutStyle = {
    display: isLogged ? '' : 'none',
  }

  const hidenWhenNotUserStyle = {
    display:
      user !== null && blog.user.userName === user.userName ? '' : 'none',
  }

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleLike = async () => {
    const newBlog = { ...blog, likes: likes + 1 }
    dispatch(likeBlog(blog.id, newBlog, user.token))
    setLikes(likes + 1)
  }
  
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id, user.token))
      dispatch(createNotification(
        `Blog ${blog.title} removed`,
        'success', 5))
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300" data-testid={blog.title}>
      <div className="flex justify-between items-center mb-2">
        <Link to={`/blogs/${blog.id}`} className="text-lg font-semibold text-blue-600 hover:text-blue-800">
          {blog.title}
        </Link>
        <span className="text-gray-600">
          {blog.author}
        </span>
      </div>
      <button 
        data-testid="show-hide" 
        onClick={handleVisibility}
        className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
      >
        {isVisible ? 'hide' : 'show'}
      </button>
      <div className={`mt-2 ${isVisible ? 'block' : 'hidden'}`}>
        <div data-testid="url" className="text-gray-600 mb-2">
          {blog.url}
        </div>
        <div data-testid="likes" className="flex items-center mb-2">
          <span className="mr-2">
            {likes} likes
          </span>
          <button
            data-testid="like-button"
            onClick={handleLike}
            className={`text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded ${!isLogged && 'hidden'}`}
          >
          like
          </button>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          added by {blog.user.name}
        </div>
        <button
          data-testid="delete"
          onClick={() => handleDelete(blog)}
          className={`text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ${hidenWhenNotUserStyle}`}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default BlogElement


// <div className="blog" style={blogStyle} data-testid={blog.title}>
//   <Link to={`/blogs/${blog.id}`}>
//     {blog.title} 
//   </Link> - {blog.author}{' '}
//   <button data-testid="show-hide" onClick={handleVisibility}>
//     {isVisible ? 'hide' : 'show'}
//   </button>
//   <div style={{ display: isVisible ? 'block' : 'none' }}>
//     <div data-testid="url">{blog.url}</div>
//     <div data-testid="likes">
//       {likes} likes
//       <button
//         data-testid="like-button"
//         style={hidenWhenLogoutStyle}
//         onClick={handleLike}
//       >
//         like
//       </button>
//     </div>
//     added by {blog.user.name}
//     <button
//       data-testid="delete"
//       style={hidenWhenNotUserStyle}
//       onClick={() => handleDelete(blog)}
//     >
//       Delete
//     </button>
//   </div>
// </div>