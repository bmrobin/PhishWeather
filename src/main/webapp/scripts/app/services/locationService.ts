import { appUrl } from "../common/constants";
import { Location } from "../models/location";
import { Weather } from "../models/weather";

export class LocationService {

    public getWeather(date: string, city: string, state: string): Promise<any> {
        city = city.replace(/\s/g, "%20");
        state = state.replace(/\s/g, "%20");
        let loc = new Location(city, state);
        let weatherData: Weather;

        return new Promise((resolve, reject) => {
            $.ajax({
                data: {
                    "city": city,
                    "date": date,
                    "state": state
                },
                method: "GET",
                url: appUrl + "/date"
            }).then(
                (data, textStatus, jqXHR) => {
                    weatherData = new Weather(data);
                    resolve(weatherData);
                },
                (jqXHR, textStatus, error) => {
                    window.console.error("An error occurred connecting to the weather service!");
                    reject(null);
                }
            );
        });
    }
}
