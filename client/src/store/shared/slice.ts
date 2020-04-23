import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sharedState: SharedState = {
    auth: {
        current: {
            id: 1,
            username: 'admin',
            password: 'admin',
            email: 'admin@gmail.com',
            roles: ['ADMIN', 'USER'],
            enabled: true,
            admin: true,
            active: true,
            accountNonLocked: true,
            accountNonExpired: true
        }
    },
    entries: {
        comments: [],
        rates: [],
        labels: [],
        dashboards: [],
        lists: [],
        cards: [],
        users: [],
    }
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
