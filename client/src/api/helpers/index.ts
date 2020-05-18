import axios from 'axios'

export const configureCRUDService = <T, D>(model: string) => {
    const CRUDService: ICRUDService<T, D> = {
        api: `/${model}`,
        readList() {
            return axios.get(this.api);
        },
        create(details) {
            return axios.post(this.api, details);
        },
        read(id) {
            return axios.get(`${this.api}/${id}`)
        },
        update(id, details) {
            return axios.put(`${this.api}/${id}`, details);
        },
        delete(id) {
            return axios.delete(`${this.api}/${id}`)
        }
    }
    return CRUDService;
}
