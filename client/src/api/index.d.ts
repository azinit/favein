declare type APIResponse<T> = Promise<
    import('axios').AxiosResponse<T>
>

declare type ICRUDService<T, D = T> = {
    api: string;
    readList: () => APIResponse<T[]>;
    create: (details: D) => APIResponse<number>;
    read: (id: number) => APIResponse<T>;
    update: (id: number, details: D) => APIResponse<boolean>;
    delete: (id: number) => APIResponse<boolean>;
}

declare type LinkMutationOptions = {
    parentId: number;
    parentName: string;
    childId: number;
    childName: string;
}

declare type ICommentsService = ICRUDService<IComment, ICommentDTO>;
declare type IRatesService = ICRUDService<IRate, IRateDTO>;
declare type ILabelsService = ICRUDService<ILabel, ILabelDTO>;
declare type IUsersService = ICRUDService<IUser, IUserDTO> & {
    signIn: (email: string, password: string) => APIResponse<{
        token: string;
        user: IUser;
    }>;
    addFave: (userId: number, cardId: number) => APIResponse<boolean>;
    deleteFave: (userId: number, cardId: number) => APIResponse<boolean>;
};
declare type IDashboardsService = ICRUDService<IDashboard, IDashboardDTO>;
declare type IListsService = ICRUDService<IList, IListDTO>;
declare type ICardsService = ICRUDService<ICard, ICardDTO> & {
    addLabel: (cardId: number, labelId: number) => APIResponse<boolean>;
    deleteLabel: (cardId: number, labelId: number) => APIResponse<boolean>;
    addComment: (cardId: number, commentId: number) => APIResponse<boolean>;
    deleteComment: (cardId: number, commentId: number) => APIResponse<boolean>;
    // addRate: (cardId: number, rateId: number) => APIResponse<boolean>;
    // deleteRate: (cardId: number, rateId: number) => APIResponse<boolean>;
};

declare type APIService = {
    comments: ICommentsService;
    rates: IRatesService;
    labels: ILabelsService;
    users: IUsersService;
    dashboards: IDashboardsService;
    lists: IListsService;
    cards: ICardsService;
    init: (token: string) => void;
}

declare type TotalData = {
    comments: IComment[];
    rates: IRate[];
    labels: ILabel[];
    users: IUser[];
    cards: ICard[];
    lists: IList[];
    dashboards: IDashboard[];
}