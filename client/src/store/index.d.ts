/// <reference types="./schema" />
/// <reference types="./helpers" />

/// start region `store`
declare interface EntryState<T, D = T> {
    entries: T[];
    current?: T;
    data: Partial<D>;
}
declare type CardEntryState = EntryState<ICard>;
declare type SharedState = {
    auth: {
        current: IUser;
    }
    entries: {
        comments: IComment[];
        rates: IRate[];
        labels: ILabel[];
        dashboards: IDashboard[];
        lists: IList[];
        cards: ICard[];
        users: IUser[];
    }
}

declare type IGlobalState = {
    shared: SharedState;
    dashboards: EntryState<IDashboard, IDashboardDTO>;
    lists: EntryState<IList, IListDTO>;
    cards: EntryState<ICard, ICardDTO>;
    rates: EntryState<IRate, IRateDTO>;
}

declare type GlobalStateGetter = () => IGlobalState;