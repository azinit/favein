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
    cards: CardEntryState;
    shared: SharedState;
}

declare type GlobalStateGetter = () => IGlobalState;