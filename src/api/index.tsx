import { configureCRUDService } from "./helpers";
import axios from "axios";

const API: APIService = {
    comments: configureCRUDService('comments'),
    rates: configureCRUDService('rates'),
    labels: configureCRUDService('labels'),
    dashboards: configureCRUDService('dashboards'),
    lists: configureCRUDService('lists'),
    cards: {
        ...configureCRUDService('cards'),
        addLabel(cardId, labelId) {
            return axios.put(`/cards/${cardId}/labels/add/${labelId}`)
        },
        deleteLabel(cardId, labelId) {
            return axios.put(`/cards/${cardId}/labels/remove/${labelId}`)
        },
        addComment(cardId, commentId) {
            return axios.put(`/cards/${cardId}/comments/add/${commentId}`)
        },
        deleteComment(cardId, commentId) {
            return axios.put(`/cards/${cardId}/comments/remove/${commentId}`)
        },
        getFavesAmount(cardId) {
            return axios.get(`/cards/${cardId}/faves`)
        }
    },
    users: {
        ...configureCRUDService('users'),
        signIn(email, password) {
            return axios.post('/sign-in', { email, password })
        },
        signUp(email, password, username) {
            return axios.post('/sign-up', { email, password, username })
        },
        addFave(userId, cardId) { 
            return axios.put(`/users/${userId}/faves/add/${cardId}`);
        },
        deleteFave(userId, cardId) { 
            return axios.put(`/users/${userId}/faves/delete/${cardId}`);
        },
    },
    init(token) {
        axios.defaults.baseURL = 'http://localhost/api'
        const { Authorization, ...headers } = axios.defaults.headers.common
        if (token) {
            axios.defaults.headers.common.Authorization = token
            return;
        }
        axios.defaults.headers.common = headers
    }
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
