import API from '../apis/api'

const URL = `${process.env.REACT_APP_API}/`

class IndexService {
  index = () => API.get(URL)
}

export default new IndexService()