import {
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAILURE
} from './action-types'
import axios from 'axios'

export function fetchPrices(props = {}) {
  
  return dispatch => {
    const API = `${process.env.API}s_lat=${props.start_lat}&s_lng=${props.start_lng}&e_lat=${props.lat}&e_lng=${props.lng}`

    axios.get(API)
      .then(res => dispatch(console.log(res.data)))
      .catch(err => dispatch(console.log(err)))
  }
}