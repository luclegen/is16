import PU from '../apis/public'

const URL = `${process.env.REACT_APP_API}/codes/`

class CodeService {
  create = email => PU.post(URL, email)
}

export default new CodeService()