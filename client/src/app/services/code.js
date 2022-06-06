import API from '../apis/api'

const URL = `${process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : process.env.REACT_APP_API}/codes/`

class CodeService {
  create = email => API.post(URL, email)
}

export default new CodeService()