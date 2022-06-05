import PU from '../apis/public'

const URL = `${process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : process.env.REACT_APP_API}/codes/`

class CodeService {
  create = email => PU.post(URL, email)
}

export default new CodeService()