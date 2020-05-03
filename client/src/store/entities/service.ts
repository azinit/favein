import { Dispatch } from "react";
import { sliceMap } from '.'
import API from 'api'

export const getActions = (name: EntityName) => sliceMap[name].actions

export const readAllEntities = () => async (dispatch: Dispatch<any>) => {
    Object.keys(sliceMap).forEach(name => {
        dispatch(readEntities(name as EntityName))
    })
}
export const readEntities = (name: EntityName) => async (dispatch: Dispatch<any>) => {
    const { updateEntities, setLoading } = getActions(name)
    dispatch(setLoading(true))
    const response = await API[name].readList()
    dispatch(updateEntities(response.data as any))
    dispatch(setLoading(false))
}

export const readEntity = (name: EntityName, id: number) => async (dispatch: Dispatch<any>) => {
    const response = await API[name].read(id)
    return response.data
}

export const createEntity = (name: EntityName) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    const { resetDTODetails, addEntity } = getActions(name)
    const { auth, ...rest } = getState()
    const { payload } = rest[name]
    // FIXME: temp, more unique
    const reqPayload = {
        authorId: auth.current.id,
        ...payload
    }
    const responseId = await API[name].create(reqPayload as any)
    const responseEntity = await API[name].read(responseId.data)
    dispatch(resetDTODetails())
    dispatch(addEntity(responseEntity.data as any))
}

export const deleteEntity = (name: EntityName, id: number) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    if (window.confirm('Вы действительно хотите продолжить удаление? Отменить операцию будет нельзя!')) {
        const { removeEntity } = getActions(name)
        await API[name].delete(id)
        dispatch(removeEntity(id))
    }
}