import { Weather } from "../models/weather";
import { LocationService } from "../services/locationService";

export class UI {

    private locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
        $("#zip-code-id").on("input", (event) => {
            // TODO - use `event.target.value` but currently typescript is erroring on it
            this.locationService.getLocationData("22180")
                .then((weatherData) => {
                    this.displayLocationData(weatherData);
                })
                .catch((error) => {
                    this.displayError();
                });
        });
    }

    private displayError() {
        $("#error").text("An error occurred connecting to the weather service!");
        $("#error").show();
        $("#weather-conditions").hide();
    }

    private  displayLocationData(locationData: Weather) {
        $("#error").hide();
        $("#weather-conditions").show();
        $("#location-id").text(locationData.location);
        $("#conditions-id").text(locationData.conditions);
        $("#temperature-id").text(locationData.currentTempFahrenheit);
        $("#feels-like-id").text(locationData.feelsLikeFahrenheit);
        $("#time-id").text(locationData.time);
    }
}
