import API from '../apis/api'

const URL = `${process.env.REACT_APP_API_URL}users/`

class UserService {
  create = user => API.post(URL, user)
}

export default new UserService()