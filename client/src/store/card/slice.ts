import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardState: CardEntryState = {
    entries: [],
    current: undefined,
    data: {}
}

const cardSlice = createSlice({
    name: 'cards',
    initialState: cardState,
    reducers: {
        updateEntries(state: CardEntryState, action: PayloadAction<ICard[]>) {
            state.entries = action.payload;
            return state;
        }
    }
})

export const { updateEntries } = cardSlice.actions

export const cardReducer = cardSlice.reducer
