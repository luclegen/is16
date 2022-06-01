import { Component } from 'react'
import Login from '../auth/Login'
import Chats from '../chat/Chats'
import helper from '../../services/helper'

export default class Home extends Component {
  render = () => <main>{helper.loggedIn() ? <Chats cableApp={this.props.cableApp} /> : <Login login={this.login} />}</main>
}