import PU from '../apis/public'
import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API}users/`

class usersService {
  create = user => PU.post(URL, user)

  list = name => PR.get(`${URL}?name=${name}`)
}

export default new usersService()