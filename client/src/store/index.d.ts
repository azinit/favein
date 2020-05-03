/// <reference types="./schema" />
/// <reference types="./helpers" />

/// start region `store`
declare type MutationState = 'preview' | 'edit' | 'create' | 'delete';
declare type MutableEntity<T, D = T> = {

}
declare type IHaveID = {
    id: number;
}
declare type EntityState<T, D = T> = {
    entities: T[];
    current?: T;
    payload: Partial<D>;
    mutationState: MutationState;
    loading: boolean;
}

declare type IBLModel = IComment | IRate | ILabel | IDashboard | IList | ICard | IUser;
declare type IBLModelDTO = ICommentDTO | IRateDTO | ILabelDTO | IDashboardDTO | IListDTO | ICardDTO | IUserDTO;
declare type CardEntityState = EntityState<ICard>;
declare type AuthState = {
    current: IUser;
}

declare type IGlobalState = {
    dashboards: EntityState<IDashboard, IDashboardDTO>;
    lists: EntityState<IList, IListDTO>;
    cards: EntityState<ICard, ICardDTO>;
    rates: EntityState<IRate, IRateDTO>;
    labels: EntityState<ILabel, ILabelDTO>;
    comments: EntityState<IComment, ICommentDTO>;
    users: EntityState<IUser, IUserDTO>;
    auth: AuthState;
}

declare type GlobalStateGetter = () => IGlobalState;
declare type EntityName = keyof IGlobalState & keyof APIService;
declare type OnChange<T = HTMLInputElement> = (e: React.ChangeEvent<T>) => void;
