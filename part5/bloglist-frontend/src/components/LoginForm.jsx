import PropTypes from 'prop-types'

const LoginForm = ({
  isLogged,
  handleLogin,
  handleLogout,
  userName,
  password,
  setUserName,
  setPassword,
  user
}) => {
  if (isLogged) {
    return (
      <div>
        <p>Logged in as {user.userName}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  const handleUserNameChange = (e) => setUserName(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  return (
    <div>
      <h2>Log in to application to view blogs</h2>
      <form onSubmit={handleLogin}>
          UserName: <input name='userName' value={userName} onChange={handleUserNameChange} type='text' />
          Password: <input name='password' value={password} onChange={handlePasswordChange} type='password' />
        <button name="login" type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm