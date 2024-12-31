import { createSlice } from '@reduxjs/toolkit'

import blogServices from '../services/blogs'

//Thunk function to initialize the blogs
export const initializeBlogs = () => {
  return async (dispatch, getState) => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, token) => {
  return async (dispatch, getState) => {
    const newBlog = await blogServices.create(blog, token)
    dispatch(addBlog(newBlog))
    return newBlog
  }
}

export const removeBlog = (blogId, token) => {
  return async (dispatch, getState) => {
    await blogServices.remove(blogId, token)
    dispatch(deleteBlog(blogId))
  }
}

export const likeBlog = (blogId, newBlog, token) => {
  return async (dispatch, getState) => {
    await blogServices.update(blogId, newBlog, token)
    dispatch(updateBlog(newBlog))
  }
}

export const commentBlog = (blogId, content, token) => {
  return async (dispatch, getState) => {
    const createdComment = await blogServices.postComment(
      blogId,
      content,
      token
    )
    const updatedBlog = {
      ...getState().blogs.find((blog) => blog.id === blogId),
      comments: [
        ...getState().blogs.find((blog) => blog.id === blogId).comments,
        createdComment,
      ],
    }
    dispatch(updateBlog(updatedBlog))
    return createdComment
  }
}

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      const blogs = action.payload
      return blogs
    },
    addBlog: (state, action) => {
      const newBlog = action.payload
      return [...state, newBlog]
    },
    deleteBlog: (state, action) => {
      const blogId = action.payload
      return state.filter((blog) => blog.id !== blogId)
    },
    updateBlog: (state, action) => {
      const blogId = action.payload.id
      const newBlog = action.payload
      return state.map((blog) => (blog.id === blogId ? newBlog : blog))
    },
  },
})

export const { setBlogs, addBlog, deleteBlog, updateBlog } = blogSlice.actions
