import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const authState: AuthState = {
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
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        updateState(state: AuthState, action: PayloadAction<Partial<AuthState>>) {
            state = { ...state, ...action.payload}
        }
    }
})

export const {
    updateState
} = authSlice.actions

export const authReducer = authSlice.reducer
