import { configureEntitySlice } from '../helpers'

export const dashboardsSlice = configureEntitySlice<IDashboard, IDashboardDTO>('dashboards')
export const listsSlice = configureEntitySlice<IList, IListDTO>('lists')
export const cardsSlice = configureEntitySlice<ICard, ICardDTO>('cards')
export const ratesSlice = configureEntitySlice<IRate, IRateDTO>('rates')
