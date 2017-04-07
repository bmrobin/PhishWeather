import { Location } from "../models/location";
import { Weather } from "../models/weather";

export class LocationService {

    public getZipCodeLocationData(zipCode: string): Promise<any> {
        let loc = new Location(zipCode);
        let weatherData: Weather;

        return new Promise((resolve, reject) => {
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/zip/" + loc.zipCode
            }).then(
                (data, textStatus, jqXHR) => {
                    weatherData = new Weather(data);
                    window.console.log("weather data: ", weatherData);
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
