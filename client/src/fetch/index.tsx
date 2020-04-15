import { configureCRUDService } from "./helpers";

const Fetch: IFetchService = {
    comments: configureCRUDService('comments'),
    rates: configureCRUDService('rates')
}

export default Fetch;
