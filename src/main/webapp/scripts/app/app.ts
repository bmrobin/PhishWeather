import { LocationService } from "./services/locationService";

class App {
    private greeting: string = "learning typescript :)";
    private locationService = new LocationService();

    constructor() {
        this.setGreeting(this.greeting);
        this.locationService.getLocationData("26209");
    }

    public setGreeting(greeting: string) {
        $("#test").text(greeting);
    }
}

$(document).ready(() => {
    let app = new App();
});
