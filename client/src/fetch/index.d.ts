declare type APIResponse<T> = Promise<
    import('../../node_modules/axios').AxiosResponse<T>
>

declare type ICRUDService<T, D = T> = {
    api: string;
    readList: () => APIResponse<T[]>;
    create: (details: D) => APIResponse<boolean>;
    read: (id: number) => APIResponse<T>;
    update: (details: D) => APIResponse<boolean>;
    delete: (id: number) => APIResponse<boolean>;
}

declare type ICommentsService = ICRUDService<IComment, ICommentDTO>;
declare type IRatesService = ICRUDService<IRate, IRateDTO>;
declare type ILabelsService = ICRUDService<ILabel, ILabelDTO>;
declare type IUsersService = ICRUDService<IUser, IUserDTO>;
declare type IDashboardsService = ICRUDService<IDashboard, IDashboardDTO>;
declare type IListsService = ICRUDService<IList, IListDTO>;
declare type ICardsService = ICRUDService<ICard, ICardDTO>;

declare type IFetchService = {
    comments: ICommentsService;
    rates: IRatesService;
    labels: ILabelsService;
    users: IUsersService;
    dashboards: IDashboardsService;
    lists: IListsService;
    cards: ICardsService;
}