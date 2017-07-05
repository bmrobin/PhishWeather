import * as $ from "jquery";
import { Location } from "../models/location";
import { Weather } from "../models/weather";
import { ajaxGet } from "./ajaxRequest";

export class LocationService {

    public getWeather(date, city, state) {
        city = city.replace(/\s/g, "%20");
        state = state.replace(/\s/g, "%20");
        let loc = new Location(city, state);
        let weatherData;
        return ajaxGet({"city": city, "state": state, "date": date}, "/date");
    }
}
