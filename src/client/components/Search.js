import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPrices } from '../actions'
import Searchbar from './searchbar'

class Search extends Component {
  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div id="search">
        <form 
          onSubmit={this.handleSubmit}
          className="container row">
          <Searchbar purpose="Start" />
          <Searchbar purpose="Destination" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    start: state.start,
    destination: state.destination
  }
}

export default connect(mapStateToProps)(Search)