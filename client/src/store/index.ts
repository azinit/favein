import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { cardReducer } from './card/slice'
import { sharedReducer } from './shared/slice'
import thunk from 'redux-thunk'

export const reducer = combineReducers({
    card: cardReducer,
    shared: sharedReducer
})

export const store = configureStore({
    reducer,
    middleware: [thunk]
})
