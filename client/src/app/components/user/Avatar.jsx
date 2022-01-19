import React, { Component } from 'react'

export default class Avatar extends Component {
  render = () => <div className="avatar" title={this.props.name} style={{ color: '#' + '0'.repeat(6 - (parseInt('ffffff', 16) - parseInt(this.props.avatar?.slice(1), 16)).toString(16).length) + (parseInt('ffffff', 16) - parseInt(this.props.avatar?.slice(1), 16)).toString(16), background: this.props.avatar, width: this.props.width, minWidth: this.props.width, height: this.props.height, fontSize: this.props.fontSize }}><strong>{this.props.name && this.props.name[0]}</strong></div>
}
