import API from "api"
import { setToken, setUser, addFave as addFaveStore, deleteFave as deleteFaveStore, resetAuthPayload } from "./slice"

export const signIn = () => async (dispatch: any, getState: GlobalStateGetter) => {
    const { email, password } = getState().auth.authPayload
    if (email && password) {
        const responseLogin = await API.users.signIn(email, password)
        const { token, user } = responseLogin.data

        window.localStorage.setItem('favein_auth_jwt', token)
        window.localStorage.setItem('favein_auth_user', JSON.stringify(user))

        dispatch(setUser(user))
        dispatch(setToken(token))
        dispatch(resetAuthPayload())
    }
}

export const signUp = () => async (dispatch: any, getState: GlobalStateGetter) => {
    const { email, password, username } = getState().auth.authPayload
    if (email && password && username) {
        await API.users.signUp(email, password, username)
        dispatch(resetAuthPayload())
        window.location.href = "/auth/sign-in"
    }
}

export const addFave = (cardId: number) => async (dispatch: any, getState: GlobalStateGetter) => {
    const { id } = getState().auth.current!
    await API.users.addFave(id, cardId);
    dispatch(addFaveStore(cardId))
}

export const deleteFave = (cardId: number) => async (dispatch: any, getState: GlobalStateGetter) => {
    const { id } = getState().auth.current!
    await API.users.deleteFave(id, cardId);
    dispatch(deleteFaveStore(cardId))
}