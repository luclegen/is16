import axios from 'axios'
import helper from '../services/helper'

const API = axios.create()

API.interceptors.request.use(
  async config => {
    config.headers = {
      'Authorization': `Bearer ${helper.getCookie('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return config
  },
  err => Promise.reject(err)
)

API.interceptors.response.use(res => res, async err => {
  if (err.response && err.response.status === 440 && window.confirm(err.response.data)) {
    helper.logout()
    window.location.pathname !== '/' && window.open('/')
  } else err.response
    ? alert(typeof err.response.data === 'object'
      ? err.response.data?.error
        ? err.response.data?.error
        : Object.entries(err.response.data).map((v, i) => (i + 1) + '. ' + v[1]).join('\n')
      : err.response.data.trim()
        ? err.response.data
        : err.response.statusText)
    : console.error(err)
  return Promise.reject(err)
})

export default API