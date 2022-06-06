import API from '../apis/api'

const URL = `${process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : process.env.REACT_APP_API}/chats/`

class ChatsService {
  view = id => API.post(`${URL}${id}`)

  read = id => API.get(`${URL}${id}`)

  update = chat => API.put(`${URL}${chat?.id}`, chat)

  list = () => API.get(URL)
}

export default new ChatsService()