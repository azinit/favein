import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { cardReducer } from './card/slice'
import { sharedReducer } from './shared/slice'
import { cardsSlice, dashboardsSlice, listsSlice, ratesSlice } from './entities'
import thunk from 'redux-thunk'

export const reducer = combineReducers({
    card: cardReducer,
    shared: sharedReducer,
    dashboards: dashboardsSlice.reducer,
    cards: cardsSlice.reducer,
    lists: listsSlice.reducer,
    rates: ratesSlice.reducer
})

export const store = configureStore({
    reducer,
    middleware: [thunk]
})
