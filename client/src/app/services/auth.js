import PU from '../apis/public'
import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API_URL}auth/`

class AuthService {
  login = user => PU.post(URL, user)

  available = email => PU.get(`${URL}?email=${email}`)

  logout = () => PR.delete(URL)
}

export default new AuthService()