/// <reference types="./schema" />
/// <reference types="./helpers" />

/// start region `store`
declare type MutationState = 'preview' | 'edit' | 'create';
declare type MutableEntity<T, D = T> = {

}
declare type EntityState<T, D = T> = {
    entities: T[];
    current?: T;
    data: Partial<D>;
}

declare type IBLModel = IComment | IRate | ILabel | IDashboard | IList | ICard | IUser;
declare type IBLModelDTO = ICommentDTO | IRateDTO | ILabelDTO | IDashboardDTO | IListDTO | ICardDTO | IUserDTO;
declare type CardEntityState = EntityState<ICard>;
declare type SharedState = {
    auth: {
        current: IUser;
    }
    entities: {
        comments: IComment[];
        rates: IRate[];
        labels: ILabel[];
        dashboards: IDashboard[];
        lists: IList[];
        cards: ICard[];
        users: IUser[];
    }
    loading: boolean;
}

declare type IGlobalState = {
    shared: SharedState;
    dashboards: EntityState<IDashboard, IDashboardDTO>;
    lists: EntityState<IList, IListDTO>;
    cards: EntityState<ICard, ICardDTO>;
    rates: EntityState<IRate, IRateDTO>;
}

declare type GlobalStateGetter = () => IGlobalState;
declare type EntityName = keyof IGlobalState & keyof APIService;
declare type OnChange<T = HTMLInputElement> = (e: React.ChangeEvent<T>) => void;
