import PU from '../apis/public'

const URL = `${process.env.REACT_APP_API}users/`

class UserService {
  create = user => PU.post(URL, user)
}

export default new UserService()