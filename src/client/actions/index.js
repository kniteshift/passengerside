import {
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAILURE
} from './action-types'
import axios from 'axios'

export function fetchPrices(props = {}) {  
  return dispatch => {
    const API = `${process.env.API}`
    const { 
      start_lat,
      start_lng,
      end_lat,
      end_lng
    } = props

    axios.post(API, {
      start_lat,
      start_lng,
      end_lat,
      end_lng
    })
      .then(res => dispatch(console.log(res.data)))
      .catch(err => dispatch(console.log(err)))
  }
}

export function fetchSuccess(rates) {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: rates
  }
}

const cherryPick = (rates = {}) => {
  return rates.forEach(vendor => Object.keys(vendor).sort().reduce(r,k))
}