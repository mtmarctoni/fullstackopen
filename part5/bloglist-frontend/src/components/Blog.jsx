import { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog, user, isLogged, handleDelete }) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hidenWhenLogoutStyle = {
    display: isLogged ? '' : 'none'
  }

  const hidenWhenNotUserStyle = {
    display: (user !== null && blog.user.userName === user.userName) ? '' : 'none'
  }

  const [isVisible, setIsVisible] = useState(false)
  const [ likes, setLikes] = useState(blog.likes)

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleLikeChange = async () => {
    const newBlog = { ...blog, likes: likes + 1 }
    //console.log(user)

    try {
      const updatedBlog = await blogServices.update( blog.id, newBlog, user.token)
      console.log(updatedBlog)
      setLikes(likes + 1)
    } catch (err) {
      console.log(err)
    }
  }

  /*
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogServices.remove(blog.id, user.token)
        console.log('Blog deleted')

        //show new blog list without the deleted blog


      } catch (err) {
        console.log(err)
      }
    }
  }
  */


  return (
    <div className='blog' style={blogStyle} data-testid={blog.title}>
      {blog.title} - {blog.author} <button data-testid='show-hide' onClick={handleVisibility}>{isVisible ? 'hide' : 'show'}</button>
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        <div data-testid='url'>{blog.url}</div>
        <div data-testid='likes'>{likes} likes
          <button data-testid='like-button' style={hidenWhenLogoutStyle} onClick={handleLikeChange}>like</button>
        </div>
        added by {blog.user.name}
        <button data-testid='delete' style={hidenWhenNotUserStyle} onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    </div>
  )
}

export default Blog

//added by {JSON.stringify(blog.user)} - {JSON.stringify(user)}