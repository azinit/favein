import CommentsService from "./comments";
import RatesService from "./rates";

const Fetch: IFetchService = {
    comments: CommentsService,
    rates: RatesService
}

export default Fetch;
