import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const BlogForm = ({ isLogged }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginUser)

  const handleAddBlog = async (e) => { 
    e.preventDefault()

    const newBlog = {
      title: e.target.elements.title.value,
      author: e.target.elements.author.value,
      url: e.target.elements.url.value,
    }

    try {
      const createdBlog = await dispatch(createBlog(newBlog, user.token))
      dispatch(createNotification(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added!`,
        'success', 5
      ))
    } catch (error) {
      dispatch(createNotification(
        `Error creating blog: ${error.response.data.error}`,
        'error', 5))
    }
  }

  if (!isLogged) {
    return (
      <div>
        <p>You need to be logged in to add a blog.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a new blog</h2>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Enter Blog details</h3>
      <form onSubmit={handleAddBlog} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            name="title" 
            id="title"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input 
            name="author" 
            id="author"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
          <input 
            name="url" 
            id="url"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button 
          name="Save Blog" 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Blog
        </button>
      </form>
    </div>

    // <div>
    //   <h2>Create a new blog</h2>
    //   <h3>Enter Blog details</h3>
    //   <form onSubmit={handleAddBlog}>
    //     <div>
    //       Title <input name="title" />
    //     </div>
    //     <div>
    //       Author <input name="author" />
    //     </div>
    //     <div>
    //       url <input name="url" />
    //     </div>
    //     <button name="Save Blog" type="submit">
    //       Save Blog
    //     </button>
    //   </form>
    // </div>
  )
}

BlogForm.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  //addBlog: PropTypes.func.isRequired,
}

export default BlogForm
