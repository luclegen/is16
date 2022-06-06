import React, { Component } from 'react'
import helper from '../../services/helper'
import Register from '../user/Register'
import authService from '../../services/auth'

const state = {
  email: '',
  password: '',
  remembered: false,
  available: false,
  visible: false,
  opened: false
}

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = state
  }

  setValue = e => this.setState({ [e.target.name]: e.target.value })

  enterEmail = async e => {
    if (e.target.value) {
      const available = (await authService.available(e.target.value)).status === 200

      e.target
        .setCustomValidity(helper
          .isEmail(e.target.value)
          ? available
            ? 'Email not registered!'
            : ''
          : 'Invalid email!')
      this.setState({ available: available, visible: false, password: '' })
      setTimeout(() => {
        if (document.querySelector('.input-group-password')) document.querySelector('.input-group-password').style.height = 0
        document.querySelector('.input-email').style.width = 260 + 'px'
      })
    }
  }

  open = () => this.setState({ opened: true })

  close = () => this.setState({ opened: false })

  submit = e => {
    e.preventDefault()

    if (this.state.email) {
      this.setState({ visible: true })
      setTimeout(async () => {
        document.querySelector('.input-group-password').style.height = 39 + 'px'
        document.querySelector('.input-email').style.width = 315 + 'px'
        document.querySelector('.input-password').focus()

        if (this.state.password)
          authService
            .login(this.state)
            .then(res => helper.setCookie(res.data) && (this.state = state) && setTimeout(() => window.location.reload()))
      })
    }
  }

  componentDidUpdate = () => window.onbeforeunload = () => this.state.email || this.password ? true : undefined

  render = () => <section className="section-only">
    <form className="form-only" onSubmit={this.submit}>
      <img className='logo-img' src="/logo.svg" alt={process.env.REACT_APP_NAME + ' logo'} />
      <h1 className="h1-only">Sign in to {process.env.REACT_APP_NAME}</h1>
      <div className={`input-group-email ${this.state.visible ? 'rounded-top' : 'rounded'}`}>
        <input className="input-email" type="email" name="email" placeholder="Email" value={this.state.email} pattern={helper.emailPattern} onInput={this.enterEmail} onInvalid={this.enterEmail} onChange={this.setValue} title="Please fill out this field." required />
        {!this.state.visible && <button className="btn-input" type="submit" disabled={!this.state.email} hidden={true}>
          <i className="material-icons">input</i>
        </button>}
      </div>
      <div className="input-group-container">
        {this.state.visible && this.state.email && <div className="input-group-password">
          <input className="input-password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.setValue} required />
          <button className="btn-input" type="submit" disabled={!this.state.password}>
            <i className="material-icons">input</i>
          </button>
        </div>}
      </div>
      <a className="link-find-account" href="/find-account" target="_blank" rel="noopener noreferrer">Forgotten password? <i className="material-icons">launch</i></a>
      <button className="btn-create-account" type="button" onClick={this.open}>Create New Account</button>
    </form>
    {this.state.opened && <Register close={this.close}></Register>}
  </section >
}
