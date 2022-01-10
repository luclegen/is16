import axios from 'axios'

const API = axios.create({
  withCredentials: true,
  credentials: "include",
  mode: 'cors',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

API.interceptors.response.use(res => res, err => {
  err.response ? alert(err.response.data) : console.error(err)
  return Promise.reject(err)
})

export default API