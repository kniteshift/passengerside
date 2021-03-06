import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStart, getDest, getDestFailure, getStartFailure } from '../actions'

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      address: '',
      purpose: this.props.purpose,
      error: false
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address
    })

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        if (this.state.purpose) {
          if (this.state.purpose == "Start") {
            return this.props.getStart(latLng)
          } 
          else if (this.state.purpose == "Destination") {
            return this.props.getDest(latLng)
          }
        }
      })
      .then(() => this.setState({ error: false }))
      .catch(err => {
        if (this.state.purpose) {
          if (this.state.purpose == "Start") {
            return this.props.getStartFailure(err)
          }
          else if (this.state.purpose == "Destination") {
            return this.props.getDestFailure(err)
          }
        }
      })
  }

  handleBlur(e) {
    if(e.target.value.length <= 6) {
      this.setState({ error: true })
    }
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleSelect,
      onBlur: this.handleBlur,
      type: 'search',
      placeholder: this.props.purpose
    }

    const cssClasses = {
      root: 'form-field',
      input: 'input-field',
      autocompleteContainer: 'autocomplete'
    }

    const AutocompleteItem = ({ suggestion }) => (<div><i className="material-icons">place</i>{suggestion}</div>)

    return (
      <div>
        <PlacesAutocomplete
          inputProps={inputProps}
          autocompleteItem={AutocompleteItem} 
          classNames={cssClasses}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          />
        {this.state.error === true ? <div>Error: Please entire the full address of your destination</div> : ' '}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(
    {},
    { getStart }, 
    { getDest }, 
    { getDestFailure }, 
    { getStartFailure }
  ), dispatch)
}

export default connect(null, mapDispatchToProps)(Searchbar)