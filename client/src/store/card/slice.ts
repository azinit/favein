import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardState: CardEntityState = {
    entities: [],
    current: undefined,
    data: {}
}

const cardSlice = createSlice({
    name: 'cards',
    initialState: cardState,
    reducers: {
        updateEntities(state: CardEntityState, action: PayloadAction<ICard[]>) {
            state.entities = action.payload;
            return state;
        }
    }
})

export const { updateEntities } = cardSlice.actions

export const cardReducer = cardSlice.reducer
