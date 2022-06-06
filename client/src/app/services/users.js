import API from '../apis/api'

const URL = `${process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : process.env.REACT_APP_API}/users/`

class usersService {
  create = user => API.post(URL, user)

  read = id => API.get(`${URL}${id}`)

  update = user => API.put(`${URL}${user.id}`, user)

  list = name => API.get(`${URL}?name=${name}`)
}

export default new usersService()