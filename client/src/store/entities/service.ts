import { Dispatch } from "react";
import { sliceMap } from '.'
import { addEntity, deleteEntity } from '../shared/slice'
import API from 'api'

const resolvePayload = (modelName: EntityName, state: IGlobalState) => {
    switch (modelName) {
        case 'cards':
             
    }
}
export const create = <D = any>(name: EntityName) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
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
        dispatch(addEntity({
            key: name,
            payload: storePayload
        }))
    }
    // TODO: reset data
    // TODO: add to dashboards list
}

export const deleteEntity = (name: EntityName, id: number) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    if (window.confirm('Вы действительно хотите продолжить удаление? Отменить операцию будет нельзя!')) {
        const response = await API[name].delete(id)
        if (response.status === 200) {
            dispatch(deleteEntity({
                key: name,
                payload: id
            }))
        }
    }
    
}