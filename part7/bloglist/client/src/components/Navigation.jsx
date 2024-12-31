import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'

const Navigation = ({ isLogged, setIsLogged }) => {
  return (
    <header>
      <nav className="bg-blue-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-white font-semibold text-xl">
              <img
                src="/logo-bloglist.png"
                alt="Logo"
                className="w-12 h-12 object-cover"
              />
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white">
                Blogs
              </Link>
              <Link to="/users" className="text-gray-300 hover:text-white">
                Users
              </Link>
            </div>
          </div>
          <div>
            <LoginForm isLogged={isLogged} setIsLogged={setIsLogged} />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
