import axios from 'axios'
import {
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAILURE,
  GET_START_SUCCESS,
  GET_START_FAILURE,
  GET_DEST_SUCCESS,
  GET_DEST_FAILURE
} from './action-types'

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
      .then(res => dispatch(fetchSuccess(res)))
      .catch(err => dispatch(fetchError(err)))
  }
}

// export function getStart(props = {}) {
//   return dispatch => {
//     dispatch(getStartSuccess())
//   }
// }

// export function getDest(props = {}) {
//   return dispatch => {
//     dispatch(getDestSuccess())
//   }
// }

export function fetchSuccess(rates) {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: rates
  }
}

export function fetchError(error) {
  return {
    type: FETCH_RATES_FAILURE,
    error
  }
}

export function getStart(coords) {
  return {
    type: GET_START_SUCCESS,
    payload: coords
  }
}

export function getStartFailure(error) {
  return {
    type: GET_START_FAILURE,
    error
  }
}

export function getDest(coords) {
  return {
    type: GET_DEST_SUCCESS,
    payload: coords
  }
}

export function getDestFailure(error) {
  return {
    type: GET_DEST_FAILURE,
    error
  }
}