import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API}messages/`

class messagesService {
  create = message => PR.post(URL, message)
}

export default new messagesService()