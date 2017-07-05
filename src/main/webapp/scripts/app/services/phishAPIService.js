import { ajaxPost } from "./ajaxRequest";

export class PhishApiService {

    lookupShowByDate(year, month, day) {
        let query = "&day=" + day + "&month=" + month + "&year=" + year;
        return ajaxPost("https://api.phish.net/v3/shows/query?apikey=", query);
    }

}
