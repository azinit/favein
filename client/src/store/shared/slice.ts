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
    entities: {
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
        addEntity(state: SharedState, action: PayloadAction<{
            key: keyof typeof sharedState.entities;
            payload: IBLModel;
        }>) {
            const { key, payload } = action.payload
            // FIXME: impl!!! refactor!!!
            state.entities[key].push(payload as any)
            return state;
        },
        deleteEntity(state: SharedState, action: PayloadAction<{
            key: keyof typeof sharedState.entities;
            payload: number;
        }>) {
            const { key, payload } = action.payload
            state.entities[key] = (state.entities[key] as any[]).filter(e => e.id !== payload)
            return state;
        }
    }
})

export const {
    updateState,
    addEntity,
    deleteEntity
} = sharedSlice.actions

export const sharedReducer = sharedSlice.reducer
