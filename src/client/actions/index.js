import axios from 'axios'
import {
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_IS_COMPLETE,
  GET_START_SUCCESS,
  GET_START_FAILURE,
  GET_DEST_SUCCESS,
  GET_DEST_FAILURE
} from './action-types'

export function fetchPrices(props = {}) {  
  return dispatch => {
    const API = process.env.API
    const { 
      start_lat,
      start_lng,
      end_lat,
      end_lng
    } = props

    dispatch(fetchInProgress())
    
    axios.post(API, {
      start_lat,
      start_lng,
      end_lat,
      end_lng
    })
      .then(res => dispatch(fetchSuccess(res.data)))
      .then(() => dispatch(fetchIsComplete()))
      .catch(err => dispatch(fetchError(err)))
  }
}

export function fetchInProgress() {
  return { 
    type: FETCH_IN_PROGRESS
  }
}

export function fetchIsComplete() {
  return {
    type: FETCH_IS_COMPLETE
  }
}


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
  let obj = {
    start_lat: coords.lat,
    start_lng: coords.lng
  }

  return {
    type: GET_START_SUCCESS,
    payload: obj
  }

}

export function getStartFailure(error) {
  return {
    type: GET_START_FAILURE,
    error
  }
}

export function getDest(coords) {
  let obj = {
    end_lat: coords.lat,
    end_lng: coords.lng
  }

  return {
    type: GET_DEST_SUCCESS,
    payload: obj
  }
}

export function getDestFailure(error) {
  return {
    type: GET_DEST_FAILURE,
    error
  }
}