class Helper {
  constructor() {
    this.namePattern = '^[A-Z]{1}[a-z]*$'
    this.surnamePattern = '^[A-Z]{1}[a-z]*(?: [A-Z]{1}[a-z]*)*(?: [A-Z]{1}[a-z]*)?$'
    this.emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  }

  isName = value => RegExp(this.namePattern).test(value)

  isSurname = value => RegExp(this.surnamePattern).test(value)

  isEmail = value => RegExp(this.emailPattern).test(value)

  isDate = (y, m, d, date = new Date(parseInt(m) + 1 + '/' + d + '/' + y)) => date.getFullYear() === parseInt(y) && date.getMonth() === parseInt(m) && date.getDate() === parseInt(d)

  isOldEnough = year => (new Date()).getFullYear() - parseInt(year) >= 5

  isDigit = value => /^\d{1}$/.test(value)

  isDigits = v => /^\d+$/.test(v)

  checkPassword = value => {
    let count = 0
    const strength = Object.freeze({
      0: 'Worst',
      1: 'Bad',
      2: 'Weak',
      3: 'Good',
      4: 'Strong'
    })

    if (value.length >= 8) count++
    if (/[a-z]/ig.test(value)) count++
    if (/\d/g.test(value)) count++
    if (/[.@#$%^&*(),.?":{}|<>]/g.test(value)) count++

    return {
      isStrong: count === 4,
      level: count,
      strength: strength[count]
    }
  }

  toCapitalize = text => text.length > 0 ? text[0].toUpperCase() + text.slice(1) : text

  getCookie = key => {
    const cookie = document.cookie.split('; ').map(c => c.split('=')).find(c => c[0] === key)

    return Array.isArray(cookie) && cookie.length ? cookie[1] : undefined
  }

  setCookie = cookies => Object.entries(cookies).map(c => document.cookie = c[0] + '=' + c[1])

  deleteCookie = key => document.cookie = key + '= Max-Age=0'

  clearCookies = () => document.cookie.split(' ').map(c => c.split('=')).forEach(c => document.cookie = c[0] + '=; Max-Age=0')

  getId = () =>
    this.loggedIn()
      ? JSON.parse(atob(this.getCookie('token')?.split('.')[1])).id['$oid']
      : null

  loggedIn = () => Boolean(this.getCookie('name'))

  getOffset = element => {
    const rect = element.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
}

export default new Helper()