import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(`${baseUrl}`)

  return res.data
}

const create = async (newBlog, token) => {
  const res = await axios.post(`${baseUrl}`, newBlog, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

const update = async (id, newBlog, token) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlog, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

const remove = async (id, token) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

const postComment = async (blogId, content, token) => {
  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { content },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res.data
}

export default {
  getAll,
  create,
  update,
  remove,
  postComment,
}
