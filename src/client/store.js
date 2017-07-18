import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export const configure = (initialState = {}) => {
  const reducer = combineReducers({

  })

  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk)
  ))

  return store
}

