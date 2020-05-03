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

export const createEntity = (name: EntityName, resolve?: (response: any) => void) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
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
    resolve?.(responseEntity)
}

export const readEntity = (name: EntityName, id: number) => async (dispatch: Dispatch<any>) => {
    const response = await API[name].read(id)
    return response.data
}

export const updateEntity = (name: EntityName) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    const { resetDTODetails, setEntity } = getActions(name)
    const { auth, ...rest } = getState()
    const { payload, current } = rest[name]
    // FIXME: temp, more unique
    const reqPayload = { ...current, ...payload }
    await API[name].update(current!.id, reqPayload as any)
    dispatch(resetDTODetails())
    dispatch(setEntity({
        id: current!.id,
        payload: reqPayload
    }))
}

export const deleteEntity = (name: EntityName, id: number) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    if (window.confirm('Вы действительно хотите продолжить удаление? Отменить операцию будет нельзя!')) {
        const { removeEntity } = getActions(name)
        await API[name].delete(id)
        dispatch(removeEntity(id))
    }
}

export const attachLabel = (cardId: number, labelId: number) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    const { addLinkedEntity } = getActions('cards')
    const { entities } = getState().labels
    const relatedLabel = entities.find(e => e.id === labelId)
    const response = await API.cards.addLabel(cardId, labelId)
    console.log(response)
    dispatch(addLinkedEntity({
        parentId: cardId,
        payload: relatedLabel,
        childName: 'labels',
    }))
}

export const detachLabel = (cardId: number, labelId: number) => async (dispatch: Dispatch<any>) => {
    const { removeLinkedEntity } = getActions('cards')
    const response = await API.cards.deleteLabel(cardId, labelId)
    console.log(response)
    dispatch(removeLinkedEntity({
        parentId: cardId,
        childId: labelId,
        childName: 'labels',
    }))
}

export const addComment = (cardId: number) => async (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
    const responseEntity: any = await new Promise((resolve) => {
        dispatch(createEntity('comments', (response) => {
            resolve(response.data)
        }))
    })
    console.log('cm:', responseEntity)
    const { addLinkedEntity } = getActions('cards')
    const { entities } = getState().comments
    const relatedComment = entities.find(e => e.id === responseEntity.id)!
    const response = await API.cards.addComment(cardId, relatedComment.id)
    console.log(response)
    dispatch(addLinkedEntity({
        parentId: cardId,
        payload: relatedComment,
        childName: 'comments',
    }))
}