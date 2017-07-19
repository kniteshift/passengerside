import { FETCH_RATES_SUCCESS, FETCH_RATES_FAILURE } from '../actions/action-types'

export const fetchReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_RATES_SUCCESS:
      return { ...state, rates: action.payload }
  }
}