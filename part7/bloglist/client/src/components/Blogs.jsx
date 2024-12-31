import { useSelector } from 'react-redux'

import BlogElement from './BlogElement'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ isLogged }) => {
  const blogs = useSelector((state) => state.blogs)

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className="block">
      <Togglable buttonLabel="Create new blog">
        <BlogForm isLogged={isLogged} />
      </Togglable>
      <h2 className="flex justify-center text-2xl font-bold mb-4 text-gray-900">
        Blog List
      </h2>
      <ul className="space-y-4 max-w-2xl mx-auto">
        {blogsSorted.map((blog) => (
          <BlogElement key={blog.id} blog={blog} isLogged={isLogged} />
        ))}
      </ul>
    </div>
  )
}

export default Blogs
