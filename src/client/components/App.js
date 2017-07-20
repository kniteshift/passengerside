import React, { Component } from 'react'
import Searchbar from './Searchbar'

export default class App extends Component {
  render() {
    return(
      <div>
        <h3>Start</h3>
        <Searchbar purpose="start" />
        <h3>End</h3>
        <Searchbar purpose="destination" />
      </div>
    )
  }
}