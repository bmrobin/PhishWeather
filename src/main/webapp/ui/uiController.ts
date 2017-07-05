// import * as $ from "jquery";
// import { Show } from "../models/show";
// import { Weather } from "../models/weather";
// import { LocationService } from "../services/locationService";
// import { PhishApiService } from "../services/phishAPIService";

// export class UIController {

//     private locationService: LocationService;
//     private phishApiService: PhishApiService;

//     constructor() {
//         this.locationService = new LocationService();
//         this.phishApiService = new PhishApiService();

//         $("#get-date-id").on("click", (event) => {
//             this.getDate();
//         });
//     }

//     private getDate() {
//         let showDate = this.constructDateFromSelectors();
//         if (showDate !== null) {
//             this.phishShowEventListener(showDate);
//         }
//     }

//     private constructDateFromSelectors() {
//         let year = $("#year-id").val();
//         let month = $("#month-id").val();
//         let day = $("#day-id").val();
//         if (year !== null && month !== null && day !== null) {
//             return year + "-" + month + "-" + day;
//         } else {
//             return null;
//         }
//     }

//     private phishShowEventListener(showDate: string): void {
//         let showDateRegex: RegExp = new RegExp(/\d{4}-\d{2}-\d{2}/);
//         if (showDateRegex.test(showDate)) {
//             let year = showDate.substring(0, 4);
//             let month = showDate.substring(5, 7);
//             let day = showDate.substring(8, 10);
//             this.phishApiService.lookupShowByDate(year, month, day)
//             .then((data) => {
//                 let show: Show = new Show(data);
//                 let location: string[] = show.location.split(", ");
//                 this.locationService.getWeather(year + month + day, location[0], location[1]).then((result) => {
//                     this.displayShowData(show);
//                     this.displayLocationData(result);
//                 });
//             })
//             .catch((error) => {
//                 window.console.log(error);
//             });
//         } else {
//             this.displayDateFormatError(showDate);
//         }
//     }

//     private displayConnectionError() {
//         $("#error").text("An error occurred connecting to the weather service!");
//         $("#error").show();
//         $("#weather-conditions").hide();
//         $("#show-result").hide();
//     }

//     private displayDateFormatError(date: string) {
//         $("#error").text("Invalid date entered: " + date + " - please enter a date in the format YYYY-MM-DD");
//         $("#error").show();
//         $("#weather-conditions").hide();
//         $("#show-result").hide();
//     }

//     private displayLocationData(locationData: Weather) {
//         $("#error").hide();
//         $("#weather-conditions").show();
//         $("#temperature-id").text(locationData.averageTempFahrenheit);
//         $("#time-id").text(locationData.date);
//     }

//     private displayShowData(showData: Show) {
//         $("#error").hide();
//         $("#show-result").show();
//         $("#show-date-id").text(showData.showdate);
//         $("#show-location-id").text(showData.location);
//         $("#show-venue-id").text(showData.venue);
//         $("#show-notes-id").text(showData.setlistnotes);
//         $("#pnet-link-id").text(showData.link);
//     }
// }
