import API from "api"
import { setToken, setUser } from "./slice"

export const signIn = () => async (dispatch: any, getState: GlobalStateGetter) => {
    const { email, password } = getState().auth.authPayload
    if (email && password) {
        const responseLogin = await API.users.signIn(email, password)
        const { token, user } = responseLogin.data

        window.sessionStorage.setItem('favein_auth_jwt', token)
        window.sessionStorage.setItem('favein_auth_user', JSON.stringify(user))

        dispatch(setUser(user))
        dispatch(setToken(token))
    }
}