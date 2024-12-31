import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )

  if (!user) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{user.name}</h1>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Added Blogs</h3>
      {user.blogs.length > 0 ? (
        <ul className="bg-white shadow-md rounded-lg overflow-hidden">
          {user.blogs.map((blog) => (
            <li
              key={blog.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="block py-3 px-4 hover:bg-gray-100 text-blue-600 hover:text-blue-800"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No blogs added yet.</p>
      )}
    </div>
  )
}

export default User
