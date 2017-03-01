import { Location } from "../models/location";
import { Weather } from "../models/weather";

export class LocationService {

    public getLocationData(location: string) {
        let loc = new Location(location);
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/" + loc.zipCode
        }).then(
            (data, textStatus, jqXHR) => {
                window.console.log("here's your data: " + data);
            },
            (jqXHR, textStatus, error) => {
                window.console.log(error);
            }
        );
    }
}
