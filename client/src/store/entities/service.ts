import { Dispatch } from "react";
import API from 'api'

export const create = <D = any>(name: keyof IGlobalState & keyof APIService) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    const state = getState()
    const { data } = state[name]
    const { current } = state.shared.auth
    // FIXME: temp
    const payload = {
        // FIXME: more unique
        authorId: current.id,
        ...data
    }
    const response = await API[name].create(payload as any)
    console.log(response)
    // TODO: reset data
    // TODO: add to dashboards list
}