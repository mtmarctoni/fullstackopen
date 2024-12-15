import PropTypes from 'prop-types'

const BlogForm = ({
  isLogged,
  addBlog
}) => {
  if (!isLogged) {
    return (
      <div>
        <p>You need to be logged in to add a blog.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <h3>Enter Blog details</h3>
      <form onSubmit={addBlog}>
        <div>Title <input name='title' /></div>
        <div>Author <input name='author' /></div>
        <div>url <input name='url' /></div>
        <button name="Save Blog" type="submit">Save Blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  addBlog: PropTypes.func.isRequired
}

export default BlogForm