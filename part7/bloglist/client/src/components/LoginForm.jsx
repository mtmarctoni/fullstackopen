import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNotification } from '../reducers/notificationReducer'
import { loginUser, removeUser } from '../reducers/loginReducer'

const LoginForm = ({ isLogged, setIsLogged }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginUser)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogout = () => {
    dispatch(removeUser())
    setIsLogged(false)
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('Logged out')
    dispatch(createNotification('Logged out', 'success', 5))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = { userName: userName, password: password }
    console.log(credentials)

    try {
      const user = await dispatch(loginUser(credentials))

      setIsLogged(true)
      setUserName('')
      setPassword('')
      console.log(`${user.userName} logged in`)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(createNotification(` Welcome, ${user.userName}!`, 'success', 5))
    } catch (error) {
      console.log(error)
      dispatch(createNotification('Invalid username or password', 'error', 5))
    }
  }

  const handleUserNameChange = (e) => setUserName(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  return (
    <div className="flex items-center">
      {!isLogged ? (
        <form onSubmit={handleLogin} className="flex items-center">
          <input
            name="userName"
            value={userName}
            onChange={handleUserNameChange}
            type="text"
            placeholder="Username"
            className="mr-2 px-2 py-1 rounded text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            className="mr-2 px-2 py-1 rounded text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            name="login"
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Login
          </button>
        </form>
      ) : (
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">Welcome, {user.userName}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

LoginForm.propTypes = {
  isLogged: PropTypes.bool.isRequired,
}

export default LoginForm
