import { Show } from "../models/show";
import { ajaxPost } from "./ajaxRequest";

export class PhishApiService {

    public lookupShowByDate(year: string, month: string, day: string): Promise<any> {
        let query = "&day=" + day + "&month=" + month + "&year=" + year;
        return ajaxPost("https://api.phish.net/v3/shows/query?apikey=", query);
    }

}
