import React, { Component } from 'react'
import helper from '../../services/helper'
import authService from '../../services/auth'
import codeService from '../../services/code'
import userService from '../../services/user'

const Sex = Object.freeze({
  FEMALE: 'Female',
  MALE: 'Male',
  OTHER: 'Other'
})
const state = {
  name: '',
  surname: '',
  email: '',
  password: '',
  confirm: '',
  day: (new Date()).getDate(),
  month: (new Date()).getMonth() + 1,
  year: (new Date()).getFullYear(),
  sex: '',
  code: '',
  available: true,
  sent: false,
  submitted: false
}

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.setName = this.setName.bind(this)
    this.setSurname = this.setSurname.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setConfirm = this.setConfirm.bind(this)
    this.setDay = this.setDay.bind(this)
    this.setMonth = this.setMonth.bind(this)
    this.setYear = this.setYear.bind(this)
    this.setSex = this.setSex.bind(this)

    this.state = state
  }

  setName = e => this.setState({ name: e.target.value })

  setSurname = e => this.setState({ surname: e.target.value })

  setEmail = e => this.setState({ email: e.target.value })

  setPassword = e => this.setState({ password: e.target.value })

  setConfirm = e => this.setState({ confirm: e.target.value })

  setDay = e => this.setState({ day: parseInt(e.target.value) })

  setMonth = e => this.setState({ month: parseInt(e.target.value) })

  setYear = e => this.setState({ year: parseInt(e.target.value) })

  setSex = e => this.setState({ sex: e.target.value })

  isCode = () => '0'.repeat(6).split('').map((v, i) => v = document.querySelectorAll('.input-digit')[i].value).filter(v => helper.isDigit(v)).length === 6

  setCode = () => this.setState({ code: this.isCode() ? Array.from(document.querySelectorAll('.input-digit')).map(e => e.value).join('') : '' })

  getInput = () => document.querySelectorAll('.input-digit')

  getIndex = target => Array.from(document.querySelector('.row-code').children).findIndex(i => i === target)

  checkSex = e => {
    const parent = e.target.className.split(' ')[0]

    if (parent === 'form-check-female'
      || parent === 'form-check-male'
      || parent === 'form-check-other') {
      const child = Array.from(e.target.children)[1]
      child.checked = true

      this.setState({ sex: child.value })
    }
  }

  enterName = e => e.target.setCustomValidity(e.target.value
    ? helper.isName(e.target.value)
      ? ''
      : 'Invalid first name.'
    : 'This field is required.')

  enterSurname = e => e.target.setCustomValidity(e.target.value
    ? helper.isSurname(e.target.value)
      ? ''
      : 'Invalid last name.'
    : 'This field is required.')

  enterEmail = async e => {
    const available = (await authService.available(e.target.value)).status === 200
    this.setState({ available: available })
    e.target.setCustomValidity(e.target.value
      ? helper.isEmail(e.target.value)
        ? available
          ? ''
          : 'Email is duplicate.'
        : 'Invalid email.'
      : 'This field is required.')
  }

  enterPassword = e => {
    const check = helper.checkPassword(e.target.value)

    e.target.setCustomValidity(e.target.value
      ? check.isStrong
        ? ''
        : 'Please choose a stronger password. Try a mix of letters, numbers, and symbols (minimum is 8 characters)!'
      : 'This field is required.')
    document.querySelector('meter').value = check.level
    this.setState({ strength: check.strength })
  }

  enterConfirm = e => e.target.setCustomValidity(e.target.value
    ? e.target.value === this.state.password
      ? ''
      : 'The passwords do not match.'
    : 'This field is required.')

  enterDigit = e => {
    const [i, input] = [this.getIndex(e.target.closest('.col-md')), this.getInput()]

    if (e.target.value.length > 1)
      return input[i].value = e.target.value[0]
    if (i < 5 && helper.isDigit(input[i].value) && input[i].value.length === 1)
      input[i + 1].focus()

    this.setCode()
  }

  clearDigit = e => {
    const [i, input] = [this.getIndex(e.target.closest('.col-md')), this.getInput()]

    if (e.keyCode === 8 && i > 0 && e.target.value === '') input[i - 1].select()

    if (!this.isCode()) this.setState({ code: Array.from(document.querySelectorAll('.input-digit')).map(e => e.value).join('') })

    this.setCode()
  }

  pasteDigit = e => {
    const [i, input] = [this.getIndex(e.target.closest('.col-md')), this.getInput()]

    const txt = (e.clipboardData || window.clipboardData).getData('text')
    const max = txt.length > 6 - i ? 6 - i : txt.length
    const f = max + i > 5 ? 5 : max + i

    setTimeout(() => {
      input[i].value = helper.isDigit(txt[0]) ? txt[0] : null
      if (helper.isDigits(txt)) input[f].focus()
    })

    for (let j = i, k = 0; k < max; j++, k++) input[j].value = helper.isDigit(txt[k]) ? txt[k] : null

    this.setCode()
  }

  chooseDob = e => {
    document
      .querySelector('#dayRegister')
      .setCustomValidity(
        helper.isDate(
          e.target.id === 'yearRegister'
            ? e.target.value
            : this.state.year,
          e.target.id === 'monthRegister'
            ? e.target.value
            : this.state.month,
          e.target.id === 'dayRegister'
            ? e.target.value
            : this.state.day)
          ? ''
          : 'Invalid date of birth.')
    document
      .querySelector('#yearRegister')
      .setCustomValidity(
        (new Date()).getFullYear() - parseInt(e.target.id === 'yearRegister'
          ? e.target.value
          : this.state.year) >= 5
          ? ''
          : 'You must be 5 years or older')
  }

  chooseSex = () =>
    document
      .querySelector('#femaleRegister')
      .setCustomValidity(this.state.sex
        ? ''
        : 'Please select one of these options')

  getIsValidDob = () => (this.state.submitted
    || this.state.day !== (new Date()).getDate()
    || this.state.month !== (new Date()).getMonth() + 1
    || this.state.year !== (new Date()).getFullYear())
    && (helper.isDate(this.state.year, this.state.month, this.state.day)
      && helper.isOldEnough(this.state.year)
      ? 'is-valid'
      : 'is-invalid')

  send = () => helper.isEmail(this.state.email)
    && codeService.create({ email: this.state.email })
      .then(res => window.open(res.data) && this.setState({ sent: true }))

  submit = e => {
    e.preventDefault()

    this.setState({ submitted: true })

    if (this.state.password === this.state.confirm
      && this.state.name
      && this.state.surname
      && this.state.email
      && this.state.password
      && this.state.confirm
      && this.state.day
      && this.state.month
      && this.state.year
      && this.state.code
    ) {
      document
        .querySelector('#femaleRegister')
        .setCustomValidity(
          this.state.sex
            ? ''
            : 'Please select one of these options')
      document
        .querySelector('#yearRegister')
        .setCustomValidity(
          helper.isOldEnough(this.state.year)
            ? ''
            : 'You must be 5 years or older')

      userService.create(this.state)
        .then(res => {
          alert(res.data)
          document.querySelector('.form-register').reset()
          document.querySelector('meter').value = 0
          this.setState(state)
        })
        .catch(err =>
          err.response?.status === 410
          && Array
            .from(document
              .querySelectorAll('.input-digit'))
            .map(e => e.value = '')
        )
    }
  }

  componentDidUpdate = () => window.onbeforeunload = () =>
    this.state.name
      || this.state.surname
      || this.state.email
      || this.state.password
      || this.state.day
      || this.state.month
      || this.state.year
      || this.state.sex
      || this.state.code
      ? true
      : undefined

  render = () => <section className="section-register">
    <form className="form-register" onSubmit={this.submit}>
      <div className="row">
        <div className="col-dm d-flex justify-content-end">
          <button className="btn-close" type="reset" onClick={this.props.close}></button>
        </div>
      </div>
      <h1 className="h1-register">Sign Up</h1>
      <div className="row-name">
        <div className="col-md">
          <div className="form-floating-name">
            <input className={`form-control ${this.state.name && (helper.isName(this.state.name) ? 'is-valid' : 'is-invalid')}`} id="nameRegister" type="text" placeholder="Name" value={this.state.name} pattern={helper.namePattern} onInput={this.enterName} onInvalid={this.enterName} onChange={this.setName} required />
            <label htmlFor="nameRegister">Name</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating-surname">
            <input className={`form-control ${this.state.surname && (helper.isSurname(this.state.surname) ? 'is-valid' : 'is-invalid')}`} id="surnameRegister" type="text" placeholder="Surname" pattern={helper.surnamePattern} onInput={this.enterSurname} onInvalid={this.enterSurname} onChange={this.setSurname} required />
            <label htmlFor="surnameRegister">Surname</label>
          </div>
        </div>
      </div>
      <div className="form-floating-email">
        <input className={`form-control ${this.state.email && (helper.isEmail(this.state.email) && this.state.available ? 'is-valid' : 'is-invalid')}`} id="addressRegister" type="email" placeholder="Email" pattern={helper.emailPattern} onInput={this.enterEmail} onInvalid={this.enterEmail} onChange={this.setEmail} required />
        <label htmlFor="addressRegister">Email</label>
      </div>
      <div className="row-password">
        <div className="col-md">
          <div className="form-floating-password">
            <input className={`form-control ${this.state.password && (helper.checkPassword(this.state.password).isStrong ? 'is-valid' : 'is-invalid')}`} id="passwordRegister" type="password" placeholder="Password" minLength="8" onInput={this.enterPassword} onChange={this.setPassword} required />
            <label htmlFor="passwordRegister">Password</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating-confirm">
            <input className={`form-control ${this.state.confirm && (this.state.confirm === this.state.password ? 'is-valid' : 'is-invalid')}`} id="confirmRegister" type="password" placeholder="Confirm" onInput={this.enterConfirm} onInvalid={this.enterConfirm} onChange={this.setConfirm} required />
            <label htmlFor="confirmRegister">Confirm</label>
          </div>
        </div>
      </div>
      <meter id="passwordStrengthRegister" title="Use 8 or more characters with a mix of letters, numbers, and symbols" max="4" value="0"></meter>
      <div className="input-group-password-strength">
        {this.state.strength && <label className="password-strength" htmlFor="passwordStrengthRegister">{helper.checkPassword(this.state.password).strength}</label>}
      </div>
      <label className={`label-group ${this.getIsValidDob()}`} htmlFor="dobRegister">Date of birth</label>
      <div className="row-dob" id="dobRegister">
        <div className="col-md">
          <div className="form-floating-day">
            <select className={`form-select-day ${this.getIsValidDob()}`} id="dayRegister" placeholder="Day" value={this.state.day} onInput={this.chooseDob} onChange={this.setDay} required >
              {'0'.repeat(31).split('').map((v, i) => <option key={i} value={i + 1} >{i + 1}</option>)}
            </select>
            <label htmlFor="dayRegister">Day</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating-month">
            <select className={`form-select-month ${this.getIsValidDob()}`} id="monthRegister" placeholder="Month" value={this.state.month} onInput={this.chooseDob} onChange={this.setMonth} required >
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((v, i) => <option key={i} value={i + 1} >{v}</option>)}
            </select>
            <label htmlFor="monthRegister">Month</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating-year">
            <select className={`form-select-year ${this.getIsValidDob()}`} id="yearRegister" placeholder="Year" value={this.state.year} aria-describedby="validationDob" onInput={this.chooseDob} onChange={this.setYear} required >
              {'0'.repeat(200).split('').map((v, i) => <option key={i} value={(new Date()).getFullYear() - i} >{(new Date()).getFullYear() - i}</option>)}
            </select>
            <label htmlFor="yearRegister">Year</label>
          </div>
        </div>
      </div>
      <label className={`label-group ${this.state.sex ? 'is-valid' : this.state.submitted && !this.state.sex && 'is-invalid'}`} htmlFor="genderRegister">Gender</label>
      <div className="row-gender" id="genderRegister">
        <div className="col-md">
          <div className={`form-check-female ${this.state.sex ? 'is-valid' : this.state.submitted && !this.state.sex && 'is-invalid'}`} onClick={this.checkSex}>
            <label className="label-female" htmlFor="femaleRegister">Female</label>
            <input className="input-female" id="femaleRegister" type="radio" name="sex" value={Sex.FEMALE} checked={this.state.sex === Sex.FEMALE} onInput={this.chooseSex} onChange={this.setSex} />
          </div>
        </div>
        <div className="col-md">
          <div className={`form-check-male ${this.state.sex ? 'is-valid' : this.state.submitted && !this.state.sex && 'is-invalid'}`} onClick={this.checkSex}>
            <label className="label-male" htmlFor="maleRegister">Male</label>
            <input className="input-male" id="maleRegister" type="radio" name="sex" value={Sex.MALE} checked={this.state.sex === Sex.MALE} onInput={this.chooseSex} onChange={this.setSex} />
          </div>
        </div>
        <div className="col-md">
          <div className={`form-check-other ${this.state.sex ? 'is-valid' : this.state.submitted && !this.state.sex && 'is-invalid'}`} onClick={this.checkSex}>
            <label className="label-other" htmlFor="otherRegister">Other</label>
            <input className="input-other" id="otherRegister" type="radio" name="sex" value={Sex.OTHER} checked={this.state.sex === Sex.OTHER} onInput={this.chooseSex} onChange={this.setSex} />
          </div>
        </div>
      </div>
      <label className="label-group" htmlFor="genderRegister">Code</label>
      <div className="row-code" id="codeRegister">
        {'0'.repeat(6).split('').map((v, i) => <div className="col-md" key={i}>
          <input className="input-digit" type="number" maxLength="1" onClick={e => e.target.select()} onInput={this.enterDigit} onDrop={this.enterDigit} onKeyUp={this.clearDigit} onKeyDown={this.clearDigit} onPaste={this.pasteDigit} required />
        </div>)}
      </div>
      <div className="row">
        <div className="col-dm d-flex justify-content-center">
          {this.state.code
            ? <button className="btn-sign-up" type="submit">Sign Up</button>
            : <button className="btn-get-code" type="button" onClick={this.send}>{this.state.sent ? 'Resend' : 'Send'} Code</button>}
        </div>
      </div>
    </form>
  </section >
}