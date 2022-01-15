import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API}chats/`

class messagesService {
  list = () => PR.get(URL)
}

export default new messagesService()