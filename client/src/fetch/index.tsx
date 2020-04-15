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

export const fetchAll = () => {
    return new Promise<TotalData>(async (resolve, reject) => {
        const comments = (await Fetch.comments.readList()).data;
        const rates = (await Fetch.rates.readList()).data;
        const labels = (await Fetch.labels.readList()).data;
        const users = (await Fetch.users.readList()).data;
        const cards = (await Fetch.cards.readList()).data;
        const lists = (await Fetch.lists.readList()).data;
        const dashboards = (await Fetch.dashboards.readList()).data;
        resolve({ comments, rates, labels, users, cards, lists, dashboards })
    })
}

export default Fetch;
