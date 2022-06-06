import API from '../apis/api'

const URL = `${process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : process.env.REACT_APP_API}/messages/`

class MessagesService {
  create = message => API.post(URL, message)

  delete = id => API.delete(`${URL}${id}`)

  list = name => API.get(`${URL}?name=${name}`)
}

export default new MessagesService()