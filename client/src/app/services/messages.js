import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API}messages/`

class messagesService {
  create = message => PR.post(URL, message)

  list = name => PR.get(`${URL}?name=${name}`)
}

export default new messagesService()