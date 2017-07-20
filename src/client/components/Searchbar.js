import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStart, getDest, getDestFailure, getStartFailure } from '../actions'

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      address: '',
      purpose: ''
    }
    this.onChange = (address) => this.setState({ address })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.purpose) {
      this.setState({ purpose: nextProps.purpose })
    }
  }

  handleSelect(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        switch(this.state.purpose) {
          case "Start":
            return this.props.getStart(latLng)
          case "Destination":
            return this.props.getEnd(latLng)
        }
      })
      .catch(err => {
        switch(this.state.purpose) {
          case "Start":
            return this.props.getStartFailure(err)
          case "Destination":
            return this.props.getDestFailure(err)
        }
      })
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      type: 'search',
      placeholder: this.props.purpose,
      autoFocus: true
    }

    const cssClasses = {
      input: 'input-field',
      autocompleteContainer: 'autocomplete'
    }

    const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"></i>{suggestion}</div>)

    return (
      <div>
        <PlacesAutocomplete
          inputProps={inputProps}
          autocompleteItem={AutocompleteItem} 
          classNames={cssClasses}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, getStart, getDest, getDestFailure, getStartFailure))
}

export default connect(null, mapDispatchToProps)(Searchbar)