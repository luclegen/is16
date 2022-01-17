import PR from '../apis/private'

const URL = `${process.env.REACT_APP_API}chats/`

class ChatsService {
  read = id => PR.get(`${URL}${id}`)

  update = chat => PR.put(`${URL}${chat?.id}`, chat)

  list = () => PR.get(URL)
}

export default new ChatsService()