import axios from 'axios'
const baseUrl = '/api/users'
 
const getAll = async () => {
  const res = await axios.get(`${baseUrl}`)

  return res.data
}

const create = async (newUser, token) => {
  const res = await axios.post(`${baseUrl}`, newUser, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  return res.data
}

const update = async (id, newUser, token) => {
  const res = await axios.put(`${baseUrl}/${id}`, newUser, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  return res.data
}

const remove = async (id, token) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  return res.data
}

export default {
  getAll,
  create,
  update,
  remove,
}
