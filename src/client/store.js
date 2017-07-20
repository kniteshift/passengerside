8
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { fetchReducer, locationReducer } from './reducers'

export const configure = (initialState = {}) => {
  const reducer = combineReducers({
    rates: fetchReducer,
    location: locationReducer
  })

  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk)
  ))

  return store
}

