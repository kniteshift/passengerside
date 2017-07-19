import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return(
      <div>
        Render This App... Now!
        {this.props.children}
      </div>
    )
  }
}