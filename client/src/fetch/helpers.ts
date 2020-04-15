import axios from 'axios'

export const configureCRUDService = <T, D>(model: string) => {
    const CRUDService: ICRUDService<T, D> = {
        api: `${process.env.REACT_APP_API_DOMAIN}/${model}`,
        readList() {
            return axios.get(this.api);
        },
        create(details) {
            return axios.post(this.api, details);
        },
        read(id) {
            return axios.get(`${this.api}/${id}`)
        },
        update(details) {
            return axios.put(this.api, details);
        },
        delete(id) {
            return axios.delete(`${this.api}/${id}`)
        }
    }
    return CRUDService;
}
