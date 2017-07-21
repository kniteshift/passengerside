import React, { Component } from 'react'
import Search from './Search'
import Results from './Results'
import '../styles/styles.sass'

export default class App extends Component {
  render() {
    return(
      <div>
        <div className="App-header">
          <div className="welcome-msg">
            <h1>Passenger Side</h1>
            <p>A side by side Lyft and Uber Comparison tool. Name inspired by TLC's hit song 'No Scrubs'.</p>
          </div>
          <Search />
        </div>
          <Results />
      </div>
    )
  }
}