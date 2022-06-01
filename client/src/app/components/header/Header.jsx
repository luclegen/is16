import { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import helper from '../../services/helper'
import Avatar from '../user/Avatar'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: '',
      role: '',
      selected: false,
      keyword: '',
      width: window.innerWidth,
      dropdownOpened: false,
      isHover: false,
    }
  }

  toggle = () => this.setState({ isHover: !this.state.isHover })

  toggleDropdown = () => this.setState({ dropdownOpened: !this.state.dropdownOpened })

  componentDidMount = () => helper.isLogin()

  componentDidUpdate = () => window.onresize = () => this.setState({ width: window.innerWidth })

  logout = () => helper.clearCookies() || (window.location.href = '/')

  render = () => <header>
    <a className="logo" href="/" onMouseEnter={this.toggle} onMouseLeave={this.toggle}>
      <img className={`logo-img ${this.state.width > 560 && 'mr-1'}`} src="logo.svg" alt="Logo" hidden={this.state.isHover} />
      <img className={`logo-img ${this.state.width > 560 && 'mr-1'}`} src="logo.hover.svg" alt="Hover logo" hidden={!this.state.isHover} />
    </a>
    <Dropdown className="dropdown-avatar" isOpen={this.state.dropdownOpened} toggle={this.toggleDropdown}>
      {helper.isLogin()
        ? <DropdownToggle className="dropdown-toggle-avatar" title={helper.getCookie('name') + ' ' + helper.getCookie('surname')}><Avatar avatar={decodeURIComponent(helper.getCookie('avatar'))} name={helper.getCookie('name')} width="44px" height="44px" fontSize="33px" /></DropdownToggle>
        : <a className="link-help" href="/help" target="_blank"><i className="material-icons">help_outline</i></a>}
      <DropdownMenu className="dropdown-menu-avatar">
        <DropdownItem className="dropdown-item-normal" tag="a" href={`${helper.getId()}`}><p className="text-profile">My profile</p><i className="material-icons">info</i></DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="dropdown-item-normal" tag="a" href="/help"><p className="text-help">Help</p><i className="material-icons">help_outline</i></DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="dropdown-item-danger" onClick={this.logout}><p className="text-logout">Sign out</p><i className="material-icons">logout</i></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </header>
}