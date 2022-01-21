import React, { Component } from 'react'
import Avatar from '../user/Avatar'
import usersService from '../../services/users'
import helper from '../../services/helper'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.setValue = this.setValue.bind(this)

    this.state = {
      id: '',
      avatar: '',
      fullName: '',
      email: '',
      sex: '',
      name: '',
      surname: '',
      edit: false,
    }
  }

  componentDidMount = () => this.setProfile()

  setProfile = () =>
    usersService
      .read(window.location.pathname?.split('/')?.[1])
      .then(res => this.setState({ name: helper.getCookie('name'), surname: helper.getCookie('surname') }) || this.setState(res.data))

  setValue = e => this.setState(Object.fromEntries(new Map([[e.target.getAttribute('name'), e.target.value]])))

  cancel = () => this.setProfile() && this.setState({ edit: false })

  submit = e =>
    e.preventDefault()
    || (this.state.edit
      ? usersService
        .update(this.state)
        .then(res => this.setProfile() && helper.setCookie(res.data) && window.location.reload() && this.setState({ edit: false }))
      : this.setState({ edit: true }))

  render = () => <main>
    <section className="section-only">
      <form className="form-only" onSubmit={this.submit}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" scope="col" colSpan={2}>
                PROFILE
              </th>
            </tr>
            <tr>
              <th scope="col" colSpan={2}>
                <div className="container-only">
                  <Avatar avatar={this.state.avatar} name={this.state.fullName} width="200px" height="200px" fontSize="150px" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.edit && <tr>
              <th className="align-middle" scope="row">Avatar</th>
              <td>
                <input type="color" className="form-control" name="avatar" value={this.state.avatar} onChange={this.setValue} />
              </td>
            </tr>}
            {!this.state.edit && <tr>
              <th className="align-middle" scope="row">Full name</th>
              <td>{this.state.fullName}</td>
            </tr>}
            {this.state.edit && <tr>
              <th className="align-middle" scope="row">Name</th>
              <td>
                <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.setValue} />
              </td>
            </tr>}
            {this.state.edit && <tr>
              <th className="align-middle" scope="row">Surname</th>
              <td>
                <input className="form-control" type="text" name="surname" value={this.state.surname} onChange={this.setValue} />
              </td>
            </tr>}
            <tr>
              <th className="align-middle" scope="row">Email</th>
              <td>{this.state.edit ? <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.setValue} /> : this.state.email}</td>
            </tr>
            <tr>
              <th className="align-middle" scope="row">Date of birth</th>
              <td>{this.state.edit ? <input className="form-control" type="date" name="dob" value={this.state.dob} onChange={this.setValue} /> : (new Date(this.state.dob).getMonth() + 1) + '/' + new Date(this.state.dob).getDate() + '/' + new Date(this.state.dob).getFullYear()}</td>
            </tr>
            <tr>
              <th className="align-middle" scope="row">Sex</th>
              <td>{this.state.edit ? <select className="form-select" name="sex" value={this.state.sex} onChange={this.setValue}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select> : this.state.sex}</td>
            </tr>
            {window.location.pathname?.split('/')?.[1] === helper.getId() && <tr>
              <td colSpan={2}>
                <div className="container-only">
                  <button className={`btn-profile text-${this.state.edit ? 'warning' : 'info'}`} title={this.state.edit ? 'Save' : 'Edit'} type="submit"><i className="material-icons">{this.state.edit ? 'save' : 'edit'}</i></button>
                  {this.state.edit && <button className={`btn-profile text-danger`} title="Cancel" type="button" onClick={this.cancel}><i className="material-icons">cancel</i></button>}
                </div>
              </td>
            </tr>}
          </tbody>
        </table>
      </form>
    </section>
  </main>

}
