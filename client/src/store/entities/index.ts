import { configureEntitySlice } from '../helpers'

export const dashboardsSlice = configureEntitySlice<IDashboard, IDashboardDTO>('dashboards')
export const listsSlice = configureEntitySlice<IList, IListDTO>('lists')
export const cardsSlice = configureEntitySlice<ICard, ICardDTO>('cards')
export const ratesSlice = configureEntitySlice<IRate, IRateDTO>('rates')

export const sliceMap = {
    dashboards: dashboardsSlice,
    lists: listsSlice,
    cards: cardsSlice,
    rates: ratesSlice
}