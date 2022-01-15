import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API}messages/`

class MessagesService {
  create = message => PR.post(URL, message)

  delete = id => PR.delete(`${URL}${id}`)

  list = name => PR.get(`${URL}?name=${name}`)
}

export default new MessagesService()