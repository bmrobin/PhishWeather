import { ajaxGet } from "./ajaxRequest";

export class LocationService {

    getWeather(date, city, state) {
        city = city.replace(/\s/g, "%20");
        state = state.replace(/\s/g, "%20");
        return ajaxGet({"city": city, "state": state, "date": date}, "/date");
    }
}
