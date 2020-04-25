import { Dispatch } from "react";
import { sliceMap } from '.'
import { addEntry } from '../shared/slice'
import API from 'api'

export const create = <D = any>(name: keyof IGlobalState & keyof APIService) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    const state = getState()
    const { data } = state[name]
    const { auth } = state.shared
    // FIXME: temp
    const payload = {
        // FIXME: more unique
        authorId: auth.current.id,
        ...data
    }
    const response = await API[name].create(payload as any)
    if (response.status === 200) {
        const id = response.data
        const slice = sliceMap[name]
        const { resetDTODetails } = slice.actions
        const storePayload = { 
            id, 
            ...data,
            author: auth.current
        } as any
        console.log(storePayload)
        dispatch(resetDTODetails())
        dispatch(addEntry({
            key: name,
            payload: storePayload
        }))
    }
    // TODO: reset data
    // TODO: add to dashboards list
}