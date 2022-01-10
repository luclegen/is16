import API from '../apis/api'

const URL = `${process.env.REACT_APP_API_URL}codes/`

class CodeService {
  create = email => API.post(URL, email)
}

export default new CodeService()