import { configureCRUDService } from "./helpers";

const API: APIService = {
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
        const comments = (await API.comments.readList()).data;
        const rates = (await API.rates.readList()).data;
        const labels = (await API.labels.readList()).data;
        const users = (await API.users.readList()).data;
        const cards = (await API.cards.readList()).data;
        const lists = (await API.lists.readList()).data;
        const dashboards = (await API.dashboards.readList()).data;
        resolve({ comments, rates, labels, users, cards, lists, dashboards })
    })
}

export default API;
