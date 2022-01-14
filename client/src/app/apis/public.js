import axios from 'axios'

const API = axios.create({
  timeout: 20000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

API.interceptors.response.use(res => res, async err => {
  err.response ? alert(err.response.data) : console.warn(err)
  return Promise.reject(err)
})

export default API