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

declare type IFetchService = {
    comments: ICommentsService;
    rates: IRatesService;
}