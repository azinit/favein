import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const getSessionItem = (key: string) => window.sessionStorage.getItem(key) || undefined;

const processFaves = (faves: string): number[] => faves ? faves.split(' ').map(f => +f) : []

export const authState: AuthState = {
    token: getSessionItem('favein_auth_jwt'),
    current: (() => {
        const user = getSessionItem('favein_auth_user')
        
        if (!user) {
            return undefined
        }

        const processedUser: IUser = JSON.parse(user);
        
        return {
            ...processedUser,
            // @ts-ignore
            faves: processFaves(processedUser.faves)
        }
    })(),
    authPayload: {},
    isAuth: !!getSessionItem('favein_auth_jwt'),
    // FIXME: delete
    faves: []
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
            state.current = { ...action.payload, faves: processFaves(action.payload.faves) }
        },
        updateState(state: AuthState, action: PayloadAction<Partial<AuthState>>) {
            state = { ...state, ...action.payload }
        },
        addFave({ current }: AuthState, action: PayloadAction<number>) {
            if (current) {
                current.faves.push(action.payload)
                window.sessionStorage.setItem("favein_auth_user", JSON.stringify({
                    ...current,
                    faves: current.faves.join(' ')
                }))
            }
        },
        deleteFave({ current }: AuthState, action: PayloadAction<number>) {
            if (current) {
                current.faves = current.faves.filter(f => f !== action.payload)
                window.sessionStorage.setItem("favein_auth_user", JSON.stringify({
                    ...current,
                    faves: current.faves.join(' ')
                }))
            }
        },
    }
})

export const {
    logout,
    setToken,
    updateAuthPayload,
    setUser,
    updateState,
    addFave,
    deleteFave
} = authSlice.actions

export const authReducer = authSlice.reducer
