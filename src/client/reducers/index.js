import { 
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_IS_COMPLETE,
  GET_START_SUCCESS,
  GET_START_FAILURE,
  GET_DEST_SUCCESS,
  GET_DEST_FAILURE
} from '../actions/action-types'

export const fetchReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_RATES_SUCCESS:
      return { ...state, rates: action.payload }
    case FETCH_RATES_FAILURE:
      return { ...state, err: action.error }
    default:
      return state
  }
}

export const uiReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_IN_PROGRESS:
      return { ...state, loading: true }
    case FETCH_IS_COMPLETE:
      return { ...state, loading: false }
    default:
      return state
  }
}

export const locationReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_START_SUCCESS:
      return { ...state, start: action.payload }
    case GET_DEST_SUCCESS:
      return { ...state, destination: action.payload }
    case GET_START_FAILURE:
      return { ...state, error: action.error }
    case GET_DEST_FAILURE:
      return { ...state, error: action.error }
    default:
      return state
  }
}