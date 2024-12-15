import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const baseUrl = '/api/login'

const checkToken = (token) => {
  if (token === null) return false
  const decodedToken = jwtDecode(token)
  const currentTime = Date.now() / 1000
  console.log('Expiration time token: ', decodedToken.exp)
  return decodedToken.exp > currentTime
}

const login = async (credentials) => {
  const res = await axios.post(`${baseUrl}`, credentials)

  return res.data

}


export default {
  login,
  checkToken
}