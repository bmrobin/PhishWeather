import { LocationService } from "./services/locationService";

class App {
    private locationService = new LocationService();

    constructor() {
        this.locationService.getLocationData("26209");
    }
}

$(document).ready(() => {
    let app = new App();
});
