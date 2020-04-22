import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sharedState: SharedState = {
    comments: [],
    rates: [],
    labels: [],
    dashboards: [],
    lists: [],
    cards: [],
    users: [],
}

const sharedSlice = createSlice({
    name: 'shared',
    initialState: sharedState,
    reducers: {
        updateState(state: SharedState, action: PayloadAction<Partial<SharedState>>) {
            state = {
                ...state,
                ...action.payload
            }
            return state;
        }
    }
})

export const { updateState } = sharedSlice.actions

export const sharedReducer = sharedSlice.reducer
