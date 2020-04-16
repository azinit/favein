import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { cardReducer } from './card/slice'
import thunk from 'redux-thunk'

export const reducer = combineReducers({
    card: cardReducer
})

export const store = configureStore({
    reducer,
    middleware: [thunk]
})
