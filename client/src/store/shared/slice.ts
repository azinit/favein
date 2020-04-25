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
        },
        addEntry(state: SharedState, action: PayloadAction<{
            key: keyof typeof sharedState.entries;
            payload: IBLModel;
        }>) {
            const { key, payload } = action.payload
            // FIXME: impl!!! refactor!!!
            state.entries[key].push(payload as any)
            return state;
        },
        deleteEntry(state: SharedState, action: PayloadAction<{
            key: keyof typeof sharedState.entries;
            payload: number;
        }>) {
            const { key, payload } = action.payload
            state.entries[key] = (state.entries[key] as any[]).filter(e => e.id !== payload)
            return state;
        }
    }
})

export const {
    updateState,
    addEntry,
    deleteEntry
} = sharedSlice.actions

export const sharedReducer = sharedSlice.reducer
