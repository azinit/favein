/// <reference types="./schema" />

/// start region `store`
declare type EntryState<T> = {
    entries: T[];
    current?: T;
    data: Partial<T>;
}
declare type CardEntryState = EntryState<ICard>;
declare type SharedState = {
    comments: IComment[];
    rates: IRate[];
    labels: ILabel[];
    dashboards: IDashboard[];
    lists: IList[];
    cards: ICard[];
    users: IUser[];
}

declare type IGlobalState = {
    cards: CardEntryState;
    shared: SharedState;
}

declare type GlobalStateGetter = () => IGlobalState;