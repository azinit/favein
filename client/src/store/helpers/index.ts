import {
    createSlice,
    SliceCaseReducers, ValidateSliceCaseReducers, PayloadAction
} from '@reduxjs/toolkit'

// FIXME: temp, REFACTOR!!!

const createGenericSlice = <
    T,
    D,
    Reducers extends SliceCaseReducers<EntryState<T, D>>
>({
    name,
    initialState = {
        entries: [],
        current: undefined,
        data: {},
    },
    reducers
}: {
    name: string
    initialState?: EntryState<T, D>
    reducers: ValidateSliceCaseReducers<EntryState<T, D>, Reducers>
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            updateEntries(state: EntryState<T, D>, action: PayloadAction<T[]>) {
                state.entries = action.payload
            },
            /**
             * If you want to write to values of the state that depend on the generic
             * (in this case: `state.data`, which is T), you might need to specify the
             * State type manually here, as it defaults to `Draft<GenericState<T>>`,
             * which can sometimes be problematic with yet-unresolved generics.
             * This is a general problem when working with immer's Draft type and generics.
             */
            setCurrent(state: EntryState<T, D>, action: PayloadAction<T | undefined>) {
                state.current = action.payload
            },
            updateDTODetails(state: EntryState<T, D>, action: PayloadAction<Partial<D>>) {
                state.data = {
                    ...state.data,
                    ...action.payload
                }
            },
            ...reducers
        }
    })
}

export const configureEntitySlice = <T, D>(name: string) => {
    return createGenericSlice({
        name,
        reducers: {}
    })
}

// NOTE: old impl
// export const configureEntitySlice = <T, D>(options: SliceOptions<EntryState<T, D>>) => {
//     const { name, initialState = {}, reducers = {} } = options

//     const _initialState: EntryState<T, D> = {
//         entries: [],
//         current: undefined,
//         data: {},
//     }

//     const slice = createSlice({
//         name: name,
//         initialState: _initialState as EntryState<T, D>
//         reducers: {
//             // FIXME:!!! https://redux-toolkit.js.org/usage/usage-with-typescript#wrapping-createslice (generic-slice)
//             // @ts-ignore
//             updateEntries(state: EntryState<T, D>, action: PayloadAction<T[]>) {
//                 state.entries = action.payload
//             },
//             // @ts-ignore
//             setCurrent(state: EntryState<T, D>, action: PayloadAction<T | undefined>) {
//                 state.current = action.payload
//             },
//             updateDTODetails(state: EntryState<T, D>, action: PayloadAction<Partial<D>>) {
//                 state.data = {
//                     ...state.data,
//                     ...action.payload
//                 }
//             },
//         }
//     })

// return slice;
// }