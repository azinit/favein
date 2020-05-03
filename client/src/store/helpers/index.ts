import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const configureEntityState = <T extends IHaveID, D>(): EntityState<T, D> => ({
    entities: [],
    current: undefined,
    payload: {},
    mutationState: 'preview',
    loading: false
})

export const configureEntitySlice = <T extends IHaveID, D>(name: string) => {
    return createSlice({
        name,
        initialState: configureEntityState<T, D>() as EntityState<any>,
        reducers: {
            /** Обновление mutationState */
            setMutationState(state: EntityState<T, D>, action: PayloadAction<MutationState>) {
                state.mutationState = action.payload
            },
            /** Обновления сущностей по предметной области */
            updateEntities(state: EntityState<T, D>, action: PayloadAction<T[]>) {
                state.entities = action.payload
            },
            /** Задать флаг загрузки */
            setLoading(state: EntityState<T, D>, action: PayloadAction<boolean>) {
                state.loading = action.payload
            },
            /** Задать текущую сущность */
            setCurrent(state: EntityState<T, D>, action: PayloadAction<T | undefined>) {
                state.current = action.payload
            },
            /** Задать редактируемые данные */
            updateDTODetails(state: EntityState<T, D>, action: PayloadAction<Partial<D>>) {
                state.payload = {
                    ...state.payload,
                    ...action.payload
                }
            },
            /** Сбросить редактируемые данные */
            resetDTODetails(state: EntityState<T, D>) {
                state.payload = {}
            },
            /** Добавить сущность */
            addEntity(state: EntityState<T, D>, action: PayloadAction<T>) {
                state.entities.push(action.payload)
            },
            /** Удалить сущность */
            removeEntity(state: EntityState<T, D>, action: PayloadAction<number>) {
                state.entities = state.entities.filter(e => e.id !== action.payload)
            }
        }
    })
}
