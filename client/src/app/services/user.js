import API from '../apis/api'

const URL = `${process.env.REACT_APP_API}users/`

class UserService {
  create = user => API.post(URL, user)
}

export default new UserService()