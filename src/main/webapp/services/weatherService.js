import { ajaxGet } from "./ajaxRequest";

export function getWeather(dateObject, location) {
    let loctn = location.split(', ');
    let city = loctn[0].replace(/\s/g, "%20");
    let state = loctn[1].replace(/\s/g, "%20");
    let date = dateObject.year + dateObject.month + dateObject.day;
    return ajaxGet({ "city": city, "state": state, "date": date }, "/date");
}
