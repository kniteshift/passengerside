import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStart, getDest, getDestFailure, getStartFailure } from '../actions'

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit(event) {
    event.preventDefault()

      geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          switch(this.props.purpose) {
            case "start":
              return this.props.getStart(latLng)
              break
            case "destination":
              return this.props.getEnd(latLng)
              break
          }
        })
        .catch(err => {
          switch(this.props.purpose) {
            case "start":
              return this.props.getStartFailure(err)
            case "destination":
              return this.props.getDestFailure(err)
          }
        })
        
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"></i>{suggestion}</div>)
    return (
      <form>
        <PlacesAutocomplete
          onSubmit={this.handleFormSubmit}
          inputProps={inputProps}
          autocompleteItem={AutocompleteItem} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, getStart, getDest, getDestFailure, getStartFailure))
}

export default connect(null, mapDispatchToProps)(Searchbar)