import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const getSessionItem = (key: string) => window.sessionStorage.getItem(key) || undefined;

export const authState: AuthState = {
    token: getSessionItem('favein_auth_jwt'),
    current: (() => {
        const user = getSessionItem('favein_auth_user')
        return user ? JSON.parse(user) : undefined;
    })(),
    // current: {
    //     id: 2,
    //     username: 'admin',
    //     password: 'admin',
    //     email: 'admin@gmail.com',
    //     roles: ['ADMIN', 'USER'],
    //     enabled: true,
    //     admin: true,
    //     active: true,
    //     accountNonLocked: true,
    //     accountNonExpired: true
    // }
    authPayload: {
        email: 'admin@gmail.com',
        password: 'admin'
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        setToken(state: AuthState, action: PayloadAction<string>) {
            state.token = action.payload
        },
        updateAuthPayload(state: AuthState, action: PayloadAction<Partial<AuthDTO>>) {
            state.authPayload = {
                ...state.authPayload,
                ...action.payload
            }
        },
        setUser(state: AuthState, action: PayloadAction<IUser>) {
            state.current = action.payload
        },
        updateState(state: AuthState, action: PayloadAction<Partial<AuthState>>) {
            state = { ...state, ...action.payload}
        }
    }
})

export const {
    setToken,
    updateAuthPayload,
    setUser,
    updateState
} = authSlice.actions

export const authReducer = authSlice.reducer
