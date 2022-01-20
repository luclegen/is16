import axios from 'axios'
import helper from '../services/helper'

const API = axios.create({
  timeout: 20000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

API.interceptors.response.use(res => res, async err => {
  err.response
    ? alert(typeof err.response.data === 'object'
      ? err.response.data?.error || Object.entries(err.response.data).map((v, i) => (i + 1) + '. ' + helper.toCapitalize(v[0] + ' ' + v[1])).join('\n')
      : err.response.data.trim() || err.response.statusText)
    : console.error(err)
  return Promise.reject(err)
})

export default API