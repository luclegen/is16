import axios from 'axios'

const API = axios.create({
  withCredentials: true,
  credentials: "include",
  mode: 'cors',
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

API.interceptors.response.use(res => res, err => {
  err.response
    ? alert(err.response.status === 500
      ? err.response.data.error
      : err.response.data?.trim()
        ? err.response.data
        : err.response.statusText)
    : console.error(err)

  return Promise.reject(err)
})

export default API