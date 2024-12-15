import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)

    return () => clearTimeout(timer)

  }, [notification])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (!loggedUserJSON) {
      return
    }
    const user = JSON.parse(loggedUserJSON)
    const tokenIsValid = loginService.checkToken(user.token)

    if (tokenIsValid) {
      setUser(user)
      setIsLogged(true)

    } else {
      if (isLogged) {
        setUser(null)
        setIsLogged(false)
        setNotification({
          message: 'Your session has expired. Please login again.',
          type: 'error'
        })
      }
    }
  }, [isLogged])

  useEffect(() => {
    const getBlogs = async () => {
      const blogList = await blogService.getAll()

      setBlogs(blogList)
    }

    getBlogs()

  },[update])

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = { userName: userName, password: password }
    console.log(credentials)

    try {
      const user = await loginService.login(credentials)
      setUser(user)
      setIsLogged(true)
      setUserName('')
      setPassword('')
      console.log(`${user.userName} logged in`)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setNotification({
        message: `Welcome, ${user.userName}!`,
        type: 'success'
      })

    } catch (error) {
      console.log(error)
      setNotification({
        message: 'Invalid username or password',
        type: 'error'
      })
    }

  }

  const handleLogout = () => {
    setUser(null)
    setIsLogged(false)
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('Logged out')
    setNotification({
      message: 'Logged out',
      type: 'success'
    })
  }

  const addBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: e.target.elements.title.value,
      author: e.target.elements.author.value,
      url: e.target.elements.url.value,
    }

    try {
      const updatedBlog = await blogService.create(newBlog, user.token)
      //setBlogs(blogs.concat(updatedBlog))
      setUpdate(!update)
      setNotification({
        message: `A new blog ${updatedBlog.title} by ${updatedBlog.author} added!`,
        type: 'success'
      })

    } catch (error) {
      console.log(error)
      setNotification({
        message: 'Failed to create a new blog',
        type: 'error'
      })
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id, user.token)
        console.log('Blog deleted')
        setBlogs(blogs.filter(b => b.id !== blog.id))

      } catch (err) {
        console.log(err)
      }
    }
  }


  return (
    <div>
      <h1>Blog List App</h1>
      <Notification notification={notification} />
      <LoginForm
        isLogged={isLogged}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userName={userName}
        password={password}
        setUserName={setUserName}
        setPassword={setPassword}
        user={user}
      />
      <Togglable buttonLabel="Create new blog">
        <BlogForm
          isLogged={isLogged}
          addBlog={addBlog}
        />
      </Togglable>
      <div>
        <h2>blogs</h2>
        <ul>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user} isLogged={isLogged} handleDelete={handleDelete} />
          )}
        </ul>
      </div>
    </div>
  )


}

export default App