import PU from '../apis/public'

const URL = `${process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : process.env.REACT_APP_API}/auth/`

class AuthService {
  login = user => PU.post(URL, user)

  available = email => PU.get(`${URL}?email=${email}`)
}

export default new AuthService()