import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const getSessionItem = (key: string) => window.sessionStorage.getItem(key) || undefined;

export const authState: AuthState = {
    token: getSessionItem('favein_auth_jwt'),
    current: (() => {
        const user = getSessionItem('favein_auth_user')
        return user ? JSON.parse(user) : undefined;
    })(),
    authPayload: {},
    isAuth: !!getSessionItem('favein_auth_jwt'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        logout(state: AuthState) {
            state.token = undefined
            state.isAuth = false
            state.current = undefined
            window.sessionStorage.removeItem("favein_auth_jwt")
            window.sessionStorage.removeItem("favein_auth_user")
        },
        setToken(state: AuthState, action: PayloadAction<string>) {
            state.token = action.payload
            state.isAuth = true
        },
        updateAuthPayload(state: AuthState, action: PayloadAction<Partial<AuthDTO>>) {
            state.authPayload = {
                ...state.authPayload,
                ...action.payload
            }
        },
        setUser(state: AuthState, action: PayloadAction<IUser>) {
            // @ts-ignore
            action.payload.faves = action.payload.faves.split(' ').map(f => +f)
            state.current = action.payload
        },
        updateState(state: AuthState, action: PayloadAction<Partial<AuthState>>) {
            state = { ...state, ...action.payload}
        }
    }
})

export const {
    logout,
    setToken,
    updateAuthPayload,
    setUser,
    updateState
} = authSlice.actions

export const authReducer = authSlice.reducer
