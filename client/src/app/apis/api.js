import axios from 'axios'
import authService from '../services/auth'
import helper from '../services/helper'

const API = axios.create({
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

API.interceptors.response.use(res => res, async err => {
  if (err.response && err.response.status === 440 && window.confirm(err.response.data)) {
    authService.logout().then(() => window.location.pathname !== '/' && window.open('/'))
  } else err.response
    ? alert(typeof err.response.data === 'object'
      ? err.response.data?.error || Object.entries(err.response.data).map((v, i) => (i + 1) + '. ' + helper.toCapitalize(v[0] + ' ' + v[1])).join('\n')
      : err.response.data.trim() || err.response.statusText)
    || (err.response.status === 401 && (window.location.href = '/'))
    : console.error(err)
  return Promise.reject(err)
})

export default API