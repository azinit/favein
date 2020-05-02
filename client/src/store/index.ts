import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { cardReducer } from './card/slice'
import { sharedReducer } from './shared/slice'
import { authReducer } from './auth/slice'
import { 
    cardsSlice, 
    dashboardsSlice, 
    listsSlice, 
    ratesSlice,
    commentsSlice,
    labelsSlice
} from './entities'
import thunk from 'redux-thunk'

export const reducer = combineReducers({
    auth: authReducer,
    card: cardReducer,
    shared: sharedReducer,
    dashboards: dashboardsSlice.reducer,
    cards: cardsSlice.reducer,
    lists: listsSlice.reducer,
    rates: ratesSlice.reducer,
    comments: commentsSlice.reducer,
    labels: labelsSlice.reducer
})

export const store = configureStore({
    reducer,
    middleware: [thunk]
})
