import { updateEntities } from './slice'
import API from 'api'

// export const create = () => (dispatch: any, getState: () => IGlobalState) => {
//     // const { data, entities, current } = getState().cards;

// }

export const readList = () => async (dispatch: any, getState: GlobalStateGetter) => {
    API.cards.readList()
        .then(response => {
            if (response.status === 200) {
                dispatch(updateEntities(response.data))
            }
        })
}