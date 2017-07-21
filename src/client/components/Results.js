import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RotatingPlane } from 'better-react-spinkit'
import Rates from './Rates'

class Results extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.rates) {
      const { lyft, uber } = this.props.rates
    
      return(
        <div className="prices">
          <Rates 
            name="Uber"
            provider={uber} />
          <Rates 
            name="Lyft"
            provider={lyft} />
        </div>
      )
    } 
    
    if (this.props.loading === true) {
      return (
        <div className="loading">
          <RotatingPlane size={100} />
        </div>)
    }

    return (
      <div className="prices">
        Please enter your start and destination to see magic occur.
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rates: state.rates.rates,
    loading: state.loading.loading
  }
}

export default connect(mapStateToProps)(Results)