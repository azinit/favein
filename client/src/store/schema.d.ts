/// start region `User`
declare type IRole = 'USER' | 'ADMIN';
declare type IUserDTO = {
    email: string;
    password: string;
    username: string;
}
declare type IUser = IUserDTO & {
    id: number;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    active: boolean;
    admin: boolean;
    roles: IRole[];
    enabled: boolean;
    faves: ICard[];
}
/// start region `Rate`
declare type IRateDTO = {
    value: number;
    authorId: number;
}
declare type IRate = Omit<IRateDTO, 'authorId'> & {
    id: number;
    author: IUser;
}
/// start region `Comment`
declare type ICommentDTO = {
    content: string;
    authorId: number;
}
declare type IComment = Omit<ICommentDTO, 'authorId'> & {
    id: number;
    createdAt: string;
    author: IUser;
}
/// start region `Label`
declare type ILabelDTO = {
    name: string;
    color: string;
}
declare type ILabel = ILabelDTO & {
    id: number;
}
/// start region `Dashboard`
declare type IDashboardDTO = {
    name: string;
    description: string;
    background: string;
    authorId: number;
}
declare type IDashboard = Omit<IDashboardDTO, 'authorId'> & {
    id: number;
    author: IUser;
}
/// start region `List`
declare type IListDTO = {
    name: string;
    description: string;
    dashboardId: number;
}
declare type IList = Omit<IListDTO, 'dashboardId'> & {
    id: number;
    dashboard: IDashboard;
    author: IUser;
}
/// start region `Card`
declare type ICardDTO = {
    name: string;
    description: string;
    content: string;
    listId: number;
}
declare type ICard = Omit<ICardDTO, 'listId'> & {
    id: number;
    list: IList;
    dashboard: IDashboard;
    author: IUser;
    comments: IComment[];
    labels: ILabel[];
    rates: IRate[];
}