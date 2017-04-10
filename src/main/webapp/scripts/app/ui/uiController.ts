import { Show } from "../models/show";
import { Weather } from "../models/weather";
import { LocationService } from "../services/locationService";
import { PhishApiService } from "../services/phishAPIService";

export class UIController {

    private locationService: LocationService;
    private phishApiService: PhishApiService;

    constructor() {
        this.locationService = new LocationService();
        this.phishApiService = new PhishApiService();

        $("#zip-code-id").on("change", (event) => {
            this.zipCodeEventListener(<HTMLInputElement> event.target);
        });
        $("#get-date-id").on("click", (event) => {
            this.getDate();
        });
    }

    private zipCodeEventListener(element: HTMLInputElement): void {
        this.locationService.getZipCodeLocationData(element.value)
            .then((weatherData) => {
                this.displayLocationData(weatherData);
            })
            .catch((error) => {
                this.displayConnectionError();
            });
    }

    private getDate() {
        let showDate = this.constructDateFromSelectors();
        if (showDate !== null) {
            this.phishShowEventListener(showDate);
        }
    }

    private constructDateFromSelectors() {
        let year = $("#year-id").val();
        let month = $("#month-id").val();
        let day = $("#day-id").val();
        if (year !== null && month !== null && day !== null) {
            return year + "-" + month + "-" + day;
        } else {
            return null;
        }
    }

    private phishShowEventListener(showDate: string): void {
        let showDateRegex: RegExp = new RegExp(/\d{4}-\d{2}-\d{2}/);
        if (showDateRegex.test(showDate)) {
            let year = showDate.substring(0, 4);
            let month = showDate.substring(5, 7);
            let day = showDate.substring(8, 10);
            this.phishApiService.lookupShowByDate(year, month, day)
            .then((data) => {
                this.displayShowData(data);
            })
            .catch((error) => {
                window.console.log(error);
            });
        } else {
            this.displayDateFormatError(showDate);
        }
    }

    private displayConnectionError() {
        $("#error").text("An error occurred connecting to the weather service!");
        $("#error").show();
        $("#weather-conditions").hide();
        $("#show-result").hide();
    }

    private displayDateFormatError(date: string) {
        $("#error").text("Invalid date entered: " + date + " - please enter a date in the format YYYY-MM-DD");
        $("#error").show();
        $("#weather-conditions").hide();
        $("#show-result").hide();
    }

    private displayLocationData(locationData: Weather) {
        $("#error").hide();
        $("#weather-conditions").show();
        $("#location-id").text(locationData.location);
        $("#conditions-id").text(locationData.conditions);
        $("#temperature-id").text(locationData.currentTempFahrenheit);
        $("#feels-like-id").text(locationData.feelsLikeFahrenheit);
        $("#time-id").text(locationData.time);
    }

    private displayShowData(showData: Show) {
        $("#error").hide();
        $("#show-result").show();
        $("#show-date-id").text(showData.showdate);
        $("#show-location-id").text(showData.location);
        $("#show-venue-id").text(showData.venue);
        $("#show-notes-id").text(showData.setlistnotes);
        $("#pnet-link-id").text(showData.link);
    }
}
