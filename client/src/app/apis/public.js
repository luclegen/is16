import axios from 'axios'

const API = axios.create({
  timeout: 20000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

API.interceptors.response.use(res => res, async err => {
  err.response
    ? alert(typeof err.response.data === 'object' ? err.response.data?.error : err.response.data)
    : console.error(err)
  return Promise.reject(err)
})

export default API