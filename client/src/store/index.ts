import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './auth/slice'
import { 
    cardsSlice, 
    dashboardsSlice, 
    listsSlice, 
    ratesSlice,
    commentsSlice,
    labelsSlice,
    usersSlice
} from './entities'
import thunk from 'redux-thunk'

export const reducer = combineReducers({
    auth: authReducer,
    dashboards: dashboardsSlice.reducer,
    cards: cardsSlice.reducer,
    lists: listsSlice.reducer,
    rates: ratesSlice.reducer,
    comments: commentsSlice.reducer,
    labels: labelsSlice.reducer,
    users: usersSlice.reducer
})

export const store = configureStore({
    reducer,
    middleware: [thunk]
})
