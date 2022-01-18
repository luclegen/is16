import { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import helper from '../../services/helper'
import Avatar from '../user/Avatar'
import usersService from '../../services/users'
import messagesService from '../../services/messages'
import chatsService from '../../services/chats'

export default class Chats extends Component {
  constructor(props) {
    super(props)

    this.setMessage = this.setMessage.bind(this)
    this.setName = this.setName.bind(this)

    this.state = {
      users: [],
      foundUsers: [],
      chats: [],
      chat: null,
      new: false,
      edit: false,
      info: true,
      open: false,
      id: '',
      name: '',
      prename: '',
      photo: '',
      title: '',
      message: '',
    }
  }

  setMessage = e => this.setState({ message: e.target.value })

  setName = e => this.setState({ name: e.target.value })

  setChats = (id) =>
    chatsService.list()
      .then(chats => chatsService.read(id || this.state.chat?._id?.['$oid'] || null)
        .then(chat => setTimeout(() => this.scroll())
          && this.setState({
            new: !chat.data,
            photo: this.state.photo ? chat.data.photo : '',
            title: this.state.title ? chat.data.title : '',
            chat: chat.data,
            chats: chats.data,
          })))

  setMessages = id => chatsService.read(id).then(res => this.setState({ messages: res.data.messages }))

  setTitle = e => this.setState({ title: e.target.value })

  setPhoto = e => this.setState({ photo: e.target.value })

  choose = e =>
    (this.state.name || this.state.users?.length || this.state.photo || this.state.title)
      ? window.confirm('Discard?\nChanges you made may not be saved.') && this.setChats(e.target.closest('button')?.id) && (this.reset() || this.setState({ new: false }))
      : this.setChats(e.target.closest('button')?.id) && (this.reset() || this.setState({ new: false }))

  create = () => (this.state.name || this.state.users?.length || this.state.photo || this.state.title)
    ? window.confirm('Discard?\nChanges you made may not be saved.') && (this.reset() || this.setState({ chat: null, new: true }))
    : (this.reset() || this.setState({ chat: null, new: true }))

  edit = () => setTimeout((titleWith = (document.querySelector('.box-title').clientWidth + 26) + 'px') => setTimeout(() => document.querySelector('.input-title').style.setProperty('width', titleWith, 'important'))
    && this.setState({ edit: !this.state.edit }))
    && this.setState({ photo: this.state.chat?.photo, title: this.state.chat?.title })

  save = () =>
    this.state.edit && chatsService.update({
      id: this.state.chat?._id?.['$oid'],
      photo: this.state.photo,
      title: this.state.title,
    })
      .then(() => this.setChats() && this.setState({ edit: false, photo: '', title: '' }))

  enter = e =>
    (e.keyCode === 8 &&
      !this.state.prename &&
      !this.state.name &&
      this.state.users?.pop() &&
      this.setState({ users: this.state.users }))
    || this.setState({ prename: this.state.name })
    || setTimeout(() => usersService.list(e.target.value).then(res => this.setState({ name: e.target.value, foundUsers: res.data }))
      && setTimeout((list = document.querySelector('.list-group-users'), group = document.querySelector('.input-group-user'), input = helper.getOffset(document.querySelector('.input-user')), label = helper.getOffset(document.querySelector('.label-user'))) =>
        list && group && (list.style.setProperty('display', 'block', 'important')
          || ((list.style.top = 0 + 'px')
            && (list.style.left = 0 + 'px')
            && (list.style.top = (input.top - label.top + group.offsetHeight + 6) + 'px')
            && (list.style.left = (input.left - label.left) + 'px'))))
      && usersService.list(e.target.value).then(res => this.setState({ name: e.target.value, foundUsers: res.data })))

  add = e => setTimeout((input = document.querySelector('.input-user')) => (input.value = '') || input?.focus())
    && !this.state.users?.find(u => u.id === e.target.id)
    && this.state.users?.push({ id: e.target.id, name: e.target.name })
    && this.setState({ users: this.state.users, prename: '', name: '', foundUsers: [] })

  remove = e =>
    e.target.closest('.tag')
    && this.state.users?.splice(this.state.users?.findIndex(u => u.id === e.target.closest('.tag').id), 1)
    && this.setState({ users: this.state.users })

  delete = e =>
    window.confirm('Do you sure to ' + (e.target.closest('.container-message')?.getAttribute('unsent') === 'true' ? 'delete' : 'unsent') + ' the message?')
    && messagesService
      .delete(e.target.closest('.container-message')?.id)
      .then(() => this.setChats())

  send = (e, user = e.target?.closest('.list-group-item')) =>
    setTimeout(() => document.querySelector('.input-user')?.focus())
    && this.setState({ users: [{ id: user?.id, name: user?.getAttribute('name') }], new: true })

  make = (e, user = e.target?.closest('.list-group-item')) =>
    window.confirm(`Make admin?\n${user?.getAttribute('name')} can manage in ${this.state.chat?.title}.`)
    && chatsService
      .update({
        id: this.state.chat?._id?.['$oid'],
        admins: [
          ...this.state.chat?.members
            .filter(m => ['Creator', 'Admin'].includes(m.role))
            .map(m => m._id?.['$oid']),
          user?.id
        ]
      })
      .then(() => this.setChats())

  removeAdmin = (e, user = e.target?.closest('.list-group-item')) =>
    window.confirm(`Remove as Admin?\n${user?.getAttribute('name')} cannot manage in ${this.state.chat?.title}.`)
    && chatsService
      .update({
        id: this.state.chat?._id?.['$oid'],
        admins: this.state.chat?.members
          .filter(m => ['Creator', 'Admin'].includes(m.role))
          .map(m => m._id?.['$oid']).filter(m => m !== user?.id)
      })
      .then(() => this.setChats())

  removeMember = (e, user = e.target?.closest('.list-group-item')) => window.confirm(`Remove?\n${user?.getAttribute('name')} was removed from ${this.state.chat?.title}.`)
    && chatsService
      .update({
        id: this.state.chat?._id?.['$oid'],
        users: this.state.chat?.members
          .map(m => m._id?.['$oid'])
          .filter(m => m !== user?.id)
      })
      .then(() => this.setChats())

  addMember = e =>
    window.confirm(`Add?\n${this.state.users?.map(u => u.name).join(', ')} was added to ${this.state.chat?.title}.`)
    && chatsService
      .update({
        id: this.state.chat?._id?.['$oid'],
        users: this.state.chat?.members
          .map(m => m._id?.['$oid'])
          .concat(this.state.users.map(m => m.id))
      })
      .then(() => this.setChats() && this.setState({ name: '', users: [] }))

  admin = () =>
    this.state.chat?.members
      .filter(m => ['Creator', 'Admin'].includes(m.role))
      .map(m => m._id?.['$oid'])
      .includes(helper.getId())

  scroll = (chat = document.querySelector('.chat-body')) => chat && (chat.scrollTop = chat.scrollHeight)

  toggle = () => this.setState({ info: !this.state.info })

  toggleDropdown = e => this.setState({ open: !this.state.open, id: e.target.closest('.list-group-item')?.id })

  reset = () => this.setState({ edit: false, photo: '', title: '', name: '', users: [] })

  submit = e =>
    e.preventDefault() || (this.state.message && messagesService
      .create(this.state.new
        ? {
          users: this.state.users?.map(u => u.id),
          body: this.state.message
        }
        : {
          id: this.state.chat?._id?.['$oid'],
          body: this.state.message
        })
      .then(res => this.setChats(res.data) && e.target.reset()))

  componentDidMount = () => this.setChats() && setTimeout(() => document.querySelector(`.input-${this.state.new ? 'user' : 'message'}`)?.focus(), 500)

  componentDidUpdate = () => setTimeout(() => !this.state.new && this.setChats(), 10000) || (window.onbeforeunload = () => this.state.message || this.state.name || this.state.users?.length || this.state.title || this.state.photo ? true : undefined)

  render = () => <section className="section-chats">
    <div className="col-chats">
      <div className="chats-bar">
        <h2 className="h2-chat">Chats</h2>
        <button className="btn-write" type="button" onClick={this.create}><i className="material-icons">create</i></button>
      </div>
      <div className="search-bar" onMouseEnter={this.coloring} onMouseLeave={this.coloring}>
        <form className="form-search">
          <button className="btn-search" type={this.state.width > 800 ? 'submit' : this.state.opened && this.state.keyword ? 'submit' : 'button'} disabled={this.state.width > 800 && !this.state.keyword} onClick={this.open}>
            <i className="material-icons">search</i>
          </button>
          <input className="input-search" type="search" placeholder="Search for anything" onSelect={this.coloring} onBlur={this.coloring} onInput={this.setKeyword} />
        </form>
      </div>
      <div className="list-group">
        {this.state.chats?.length > 0 && this.state.chats.map((v, i) => <button className={`list-group-item list-group-item-action ${v._id?.['$oid'] === this.state.chat?._id?.['$oid'] && 'active'}`} id={v._id?.['$oid']} type="button" key={i} onClick={this.choose}>
          <Avatar avatar={v.photo} name={v.title} width="60px" height="60px" fontSize="45px" />
          <div className="user-info">
            <p className="fs-5">{v.title}</p>
            <p className="text-truncate">{v.message}</p>
          </div>
        </button>)}
      </div>
    </div>
    <div className={`col-chat col-md-${this.state.new || !this.state.info ? '9' : '6'}`}>
      {this.state.new
        ? <div className="chat-header">
          <div className="input-group-user">
            <label className="label-user" htmlFor="userInput">To: &nbsp;</label>
            {this.state.name && <div className="list-group-users">
              {this.state.foundUsers.map((v, i) => <button type="button" className="list-group-item list-group-item-action" id={v._id?.['$oid']} name={v.name} key={i} onClick={this.add}>
                {v.name}
              </button>)}
            </div>}
            {this.state.users?.map((v, i) => <span type="button" className="tag" id={v.id} key={i}>
              {v.name}
              <button className="btn-tag-close" type="button" onClick={this.remove}><i className="material-icons">close</i></button>
            </span>)}
            <input type="text" className="input-user" id="userInput" onInput={this.enter} onKeyUp={this.enter} onChange={this.setName} />
          </div>
        </div>
        : <div className="chat-header">
          {this.state.chat && <Avatar avatar={this.state.chat?.photo} name={this.state.chat?.title} width="44px" height="44px" fontSize="30px" />}
          {this.state.chat && <strong className="chat-name">{this.state.chat?.title}</strong>}
          {this.state.chat && <button className={`btn-chat-info ${this.state.info && 'border-primary'}`} type="button" onClick={this.toggle}><i className="material-icons">info</i></button>}
        </div>}
      <div className="chat-body">
        {this.state.chat?.messages?.length > 0 && this.state.chat?.messages.map((v, i, a) => <div className="container-message" id={v._id?.['$oid']} unsent={v.unsent.toString()} key={i}>
          <div className="row">
            <div className={`col-${v._uid['$oid'] !== helper.getId() ? '8' : '4'} col-message justify-content-${v._uid['$oid'] !== helper.getId() ? 'start' : 'end'}`}>
              {v._uid['$oid'] !== helper.getId() && (i === 0 || (a.length > 1 && i > 0 && a[i]._uid['$oid'] !== a[i - 1]._uid['$oid'])) ? <Avatar avatar={v.avatar} name={v.name} width="40px" height="40px" fontSize="30px" /> : <div style={{ 'width': '40px', 'height': '40px' }}></div>}
              {v._uid['$oid'] !== helper.getId() && <div className={`box-receiver-message ${i > 0 && a[i]._uid['$oid'] === a[i - 1]._uid['$oid'] && 'tl'} ${i < a.length - 1 && a[i]._uid['$oid'] === a[i + 1]._uid['$oid'] && 'bl'} ms-2`}>{v.body}</div>}
            </div>
            <div className={`col-${v._uid['$oid'] === helper.getId() ? '8' : '4'} col-message justify-content-${v._uid['$oid'] !== helper.getId() ? 'start' : 'end'}`}>
              {v._uid['$oid'] === helper.getId() && <button className="btn-delete" type="button" onClick={this.delete}><i className="material-icons">delete</i></button>}
              {v._uid['$oid'] === helper.getId() && <div className={`box-sender-message ${i > 0 && a[i]._uid['$oid'] === a[i - 1]._uid['$oid'] && 'tr'} ${i < a.length - 1 && a[i]._uid['$oid'] === a[i + 1]._uid['$oid'] && 'br'}`}>{v.body}</div>}
            </div>
          </div>
        </div>)}
      </div>
      {(this.state.users?.length > 0 || this.state.chat) && <div className="chat-footer">
        <form className="form-message" onSubmit={this.submit}>
          <div className="input-group flex-nowrap">
            <input className="input-message" type="text" placeholder="Aa" onChange={this.setMessage} />
            <button className="btn-send" type="submit" disabled={!this.state.message}>
              <i className="material-icons">send</i>
            </button>
          </div>
        </form>
      </div>}
    </div>
    <div className={`col-info ${this.state.new || !this.state.info ? 'd-none' : 'd-flex'} col-md-${this.state.new || !this.state.info ? '0' : '3'}`}>
      <Avatar avatar={this.state.photo || this.state.chat?.photo} name={this.state.chat?.title} width="80px" height="80px" fontSize="60px" />
      <form className="form-only" onSubmit={e => e.preventDefault() || this.state.edit ? this.save(e) : this.edit(e)}>
        {this.state.edit ? <input className="input-title" value={this.state.title} type="text" name="Title input" onChange={this.setTitle} /> : <div className="box-title"><strong>{this.state.chat?.group ? this.state.chat?.title : <a href={'/' + this.state.chat?.members?.find(m => helper.getId() !== m._id?.['$oid'])?._id?.['$oid']} target="_blank" rel="noopener noreferrer">{this.state.chat?.title}</a>}</strong></div>}
        {this.state.edit && <input className="input-photo" value={this.state.photo} type="color" name="Photo input" onChange={this.setPhoto} />}
      </form>
      {this.state.chat?.group && <details className="details-customize" open>
        <summary><strong>Customize</strong></summary>
        <div className="list-group">
          <button type="button" className="list-group-item list-group-item-action" onClick={this.state.edit ? this.save : this.edit}>
            <i className="material-icons">drive_file_rename_outline</i>
            <p className="list-group-item-name">{this.state.edit ? 'Save' : 'Edit'}</p>
          </button>
        </div>
      </details>}
      {this.state.chat?.group && <details className="details-members" open>
        <summary><strong>Members</strong></summary>
        <ul className="list-group">
          {this.state.chat?.members.map((v, i) =>
            <li className="list-group-item" id={v._id?.['$oid']} name={v.name} key={i}>
              <Avatar avatar={v.avatar} name={v.name} width="40px" height="40px" fontSize="30px" />
              <p className="member-name">{`${v.name} ${v.role && `(${v.role})`}`}</p>
              <Dropdown className="dropdown-more" isOpen={this.state.id === v._id?.['$oid'] && this.state.open} toggle={this.toggleDropdown}>
                <DropdownToggle className="dropdown-toggle-more" title="More"><i className="material-icons">more_horiz</i></DropdownToggle>
                <DropdownMenu className="dropdown-menu-more">
                  <DropdownItem className="dropdown-item-normal"><p className="text-profile" onClick={this.send}>Message</p><i className="material-icons">chat</i></DropdownItem>
                  <DropdownItem className="dropdown-item-normal" tag="a" href={'/' + v._id?.['$oid']} target="_blank" rel="noopener noreferrer"><p className="text-help">View profile</p><i className="material-icons">info</i></DropdownItem>
                  {this.admin() && <DropdownItem divider />}
                  {this.admin() && <DropdownItem className="dropdown-item-normal" onClick={v.role ? this.removeAdmin : this.make}><p className="text-help">{`${v.role ? 'Remove as A' : 'Make a'}dmin`}</p><i className="material-icons">{`${v.role ? 'remove' : 'add'}_moderator`}</i></DropdownItem>}
                  {(v._id?.['$oid'] === helper.getId() || this.admin()) && <DropdownItem className="dropdown-item-danger" onClick={this.removeMember}><p className="text-logout">{v._id?.['$oid'] === helper.getId() ? 'Leave group' : this.admin() && 'Remove'}</p><i className="material-icons">{v._id?.['$oid'] === helper.getId() ? 'logout' : this.admin() && 'person_remove'}</i></DropdownItem>}
                </DropdownMenu>
              </Dropdown>
            </li>)}

          <button type="button" className="list-group-item list-group-item-action" onClick={this.addMember}>
            <i className="add-member material-icons">person_add</i>
            <p className="list-group-item-name">Add</p>
          </button>
          <li className="list-group-item">
            <div className="input-group-user">
              <label className="label-user" htmlFor="userInput">Add: &nbsp;</label>
              {this.state.name && <div className="list-group-users">
                {this.state.foundUsers.map((v, i) => <button type="button" className="list-group-item list-group-item-action" id={v._id?.['$oid']} name={v.name} key={i} onClick={this.add}>
                  {v.name}
                </button>)}
              </div>}
              {this.state.users?.map((v, i) => <span type="button" className="tag" id={v.id} key={i}>
                {v.name}
                <button className="btn-tag-close" type="button" onClick={this.remove}><i className="material-icons">close</i></button>
              </span>)}
              <input type="text" className="input-user" id="userInput" onInput={this.enter} onKeyUp={this.enter} onChange={this.setName} />
            </div>
          </li>
        </ul>
      </details>}
    </div>
  </section>
}