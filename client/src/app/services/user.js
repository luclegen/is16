import PU from '../apis/public'
import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API_URL}users/`

class UserService {
  create = user => PU.post(URL, user)
}

export default new UserService()