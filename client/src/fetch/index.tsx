import { configureCRUDService } from "./helpers";

const Fetch: IFetchService = {
    comments: configureCRUDService('comments'),
    rates: configureCRUDService('rates'),
    labels: configureCRUDService('labels'),
    dashboards: configureCRUDService('dashboards'),
    lists: configureCRUDService('lists'),
    cards: configureCRUDService('cards'),
    users: configureCRUDService('users')
}

export default Fetch;
