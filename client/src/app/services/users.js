import PU from '../apis/public'
import PR from '../apis/private'

const URL = `${process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : process.env.REACT_APP_API}/users/`

class usersService {
  create = user => PU.post(URL, user)

  read = id => PU.get(`${URL}${id}`)

  update = user => PR.put(`${URL}${user.id}`, user)

  list = name => PR.get(`${URL}?name=${name}`)
}

export default new usersService()