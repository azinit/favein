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
            /** Задать сущность по id */
            setEntity(state: EntityState<T, D>, action: PayloadAction<{
                id: number;
                payload: any;
            }>) {
                const { id, payload } = action.payload
                state.entities = state.entities.map(e => (e.id === id) ? payload : e)
            },
            /** Удалить сущность */
            removeEntity(state: EntityState<T, D>, action: PayloadAction<number>) {
                state.entities = state.entities.filter(e => e.id !== action.payload)
            },
            /** Добавить связанную сущность */
            addLinkedEntity(state: EntityState<T, D>, action: PayloadAction<{
                parentId: number;
                childName: string;
                payload: any;
            }>) {
                const { childName, parentId, payload } = action.payload
                const entity = state.entities.find(e => e.id === parentId)
                // @ts-ignore
                entity[childName].push(payload)
            },
            /** Удалить связанную сущность */
            removeLinkedEntity(state: EntityState<T, D>, action: PayloadAction<{
                parentId: number;
                childName: string;
                childId: number;
            }>) {
                const { childName, parentId, childId } = action.payload
                const entity = state.entities.find(e => e.id === parentId)
                // @ts-ignore
                entity[childName] = entity[childName].filter(le => le.id !== childId)
            }
        }
    })
}
