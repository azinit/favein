import {
    createSlice,
    SliceCaseReducers, ValidateSliceCaseReducers, PayloadAction
} from '@reduxjs/toolkit'

// FIXME: temp, REFACTOR!!!

const createGenericSlice = <
    T,
    D,
    Reducers extends SliceCaseReducers<EntityState<T, D>>
>({
    name,
    initialState = {
        entities: [],
        current: undefined,
        data: {},
    },
    reducers
}: {
    name: string
    initialState?: EntityState<T, D>
    reducers: ValidateSliceCaseReducers<EntityState<T, D>, Reducers>
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            updateEntities(state: EntityState<T, D>, action: PayloadAction<T[]>) {
                state.entities = action.payload
            },
            /**
             * If you want to write to values of the state that depend on the generic
             * (in this case: `state.data`, which is T), you might need to specify the
             * State type manually here, as it defaults to `Draft<GenericState<T>>`,
             * which can sometimes be problematic with yet-unresolved generics.
             * This is a general problem when working with immer's Draft type and generics.
             */
            setCurrent(state: EntityState<T, D>, action: PayloadAction<T | undefined>) {
                state.current = action.payload
            },
            updateDTODetails(state: EntityState<T, D>, action: PayloadAction<Partial<D>>) {
                state.data = {
                    ...state.data,
                    ...action.payload
                }
            },
            resetDTODetails(state: EntityState<T, D>) {
                state.data = {}
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
// export const configureEntitySlice = <T, D>(options: SliceOptions<EntityState<T, D>>) => {
//     const { name, initialState = {}, reducers = {} } = options

//     const _initialState: EntityState<T, D> = {
//         entities: [],
//         current: undefined,
//         data: {},
//     }

//     const slice = createSlice({
//         name: name,
//         initialState: _initialState as EntityState<T, D>
//         reducers: {
//             // FIXME:!!! https://redux-toolkit.js.org/usage/usage-with-typescript#wrapping-createslice (generic-slice)
//             // @ts-ignore
//             updateEntities(state: EntityState<T, D>, action: PayloadAction<T[]>) {
//                 state.entities = action.payload
//             },
//             // @ts-ignore
//             setCurrent(state: EntityState<T, D>, action: PayloadAction<T | undefined>) {
//                 state.current = action.payload
//             },
//             updateDTODetails(state: EntityState<T, D>, action: PayloadAction<Partial<D>>) {
//                 state.data = {
//                     ...state.data,
//                     ...action.payload
//                 }
//             },
//         }
//     })

// return slice;
// }

// FIXME: unknown types