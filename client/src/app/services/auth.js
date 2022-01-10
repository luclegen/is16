import API from '../apis/api'

const URL = `${process.env.REACT_APP_API_URL}auth/`

class AuthService {
  login = user => API.post(URL, user)

  available = email => API.get(`${URL}?email=${email}`)

  logout = () => API.delete(URL)
}

export default new AuthService()