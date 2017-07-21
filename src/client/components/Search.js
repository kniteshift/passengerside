import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPrices } from '../actions'
import Searchbar from './Searchbar'

class Search extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const location = Object.assign({}, this.props.location.start, this.props.location.destination)
    
    this.props.fetchPrices(location)
  }

  render() {
    return (
      <div id="search">
        <form 
          className="container">
          <Searchbar 
            purpose="Start" 
            id="start" 
          />
          <Searchbar 
            purpose="Destination" 
            id="destination" 
          />
        </form>
        <div className="submit-button">
          <button 
            onClick={this.handleSubmit}
            type="submit">Submit</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    location: state.location,
    destination: state.destination
  }
}

export default connect(mapStateToProps, { fetchPrices })(Search)

