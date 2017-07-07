import { ajaxPost } from "./ajaxRequest";

export function lookupShowByDate(date) {
    let query = "&day=" + date.day + "&month=" + date.month + "&year=" + date.year;
    return ajaxPost("https://api.phish.net/v3/shows/query?apikey=", query);
}
