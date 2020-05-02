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
    },
    loading: false
}

const sharedSlice = createSlice({
    name: 'shared',
    initialState: sharedState,
    reducers: {
        setLoading(state: SharedState, action: PayloadAction<boolean>) {
            state.loading = action.payload
            return state;
        },
        updateState(state: SharedState, action: PayloadAction<Partial<SharedState>>) {
            state = {
                ...state,
                ...action.payload
            }
            return state;
        },
        addEntity(state: SharedState, action: PayloadAction<{
            key: keyof typeof sharedState.entities;
            payload: IBLModelDTO;
        }>) {
            const data = action.payload
            const payload = data.payload as any
            const key = data.key

            // FIXME: impl!!! refactor!!!
            switch(key) {
                case 'cards':
                    payload.list = state.entities.lists.find(l => l.id === payload.listId)
                    payload.rates = []
                    payload.comments = []
                    payload.labels = []
                case 'comments':
                    payload.author = state.entities.users.find(u => u.id === payload.authorId)
                case 'dashboards':
                    payload.author = state.entities.users.find(u => u.id === payload.authorId)
                case 'labels':
                case 'lists':
                    payload.dashboard = state.entities.dashboards.find(d => d.id === payload.dashboardId)
                case 'rates':
                    payload.author = state.entities.users.find(u => u.id === payload.authorId)
                case 'users':
            }
            state.entities[key].push(payload)
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
    setLoading,
    updateState,
    addEntity,
    deleteEntity
} = sharedSlice.actions

export const sharedReducer = sharedSlice.reducer
