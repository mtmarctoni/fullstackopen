import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Navigation from './components/Navigation'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import { setUser, removeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (!loggedUserJSON) {
      return
    }
    const user = JSON.parse(loggedUserJSON)
    const token = user.token ?? null
    
    const tokenIsValid = loginService.checkToken(token)

    if (tokenIsValid) {
      //setUser(user)
      dispatch(setUser(user))
      setIsLogged(true)
    } else {
      if (isLogged) {
        //setUser(null)
        dispatch(removeUser())
        setIsLogged(false)
        dispatch(createNotification(
          'Your session has expired. Please login again.',
          'error', 5
        ))
      }
    }
  }, [isLogged])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[])

  return (
    <div>
      <Navigation isLogged={isLogged} setIsLogged={setIsLogged} />
      <Notification />
      <h1 className="flex justify-center m-5 text-4xl font-bold mb-2 align-middle text-gray-900">
        Blog List App
      </h1>
      <Routes>
        <Route path="/" element={<Blogs isLogged={isLogged} />} />
        <Route path="/blogs/:id" element={<Blog isLogged={isLogged} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>

    </div>
  )
}

export default App
