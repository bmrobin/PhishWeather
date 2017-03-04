import { Location } from "../models/location";
import { Weather } from "../models/weather";

export class LocationService {

    public getLocationData(location: string): void {
        let loc = new Location(location);
        let weatherData: Weather;
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/" + loc.zipCode
        }).then(
            (data, textStatus, jqXHR) => {
                weatherData = new Weather(data);
                window.console.log("here's your data: ", weatherData);
                this.displayLocationData(weatherData);
            },
            (jqXHR, textStatus, error) => {
                window.console.error("An error occurred connecting to the weather service!");
                $("#error").text("An error occurred connecting to the weather service!");
                $("#weather-conditions").hide();
            }
        );
    }

    private displayLocationData(locationData: Weather) {
        $("#error").text();
        $("#weather-conditions").show();
        $("#location-id").text(locationData.location);
        $("#conditions-id").text(locationData.conditions);
        $("#temperature-id").text(locationData.currentTempFahrenheit);
        $("#feels-like-id").text(locationData.feelsLikeFahrenheit);
        $("#time-id").text(locationData.time);
    }
}
