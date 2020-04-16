import { updateEntries } from './slice'
import API from '../../fetch'

// export const create = () => (dispatch: any, getState: () => IGlobalState) => {
//     // const { data, entries, current } = getState().cards;

// }

export const readList = () => async (dispatch: any, getState: GlobalStateGetter) => {
    API.cards.readList()
        .then(response => {
            if (response.status === 200) {
                dispatch(updateEntries(response.data))
            }
        })
}