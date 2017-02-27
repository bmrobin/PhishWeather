import { LocationService } from './locationService';

class App {
    greeting : string = "learning typescript :)";
    locationService = new LocationService();

    constructor() {
        this.setGreeting(this.greeting);
        this.locationService.getLocationData('26209');
    }

    setGreeting(greeting : string) {
        $('#test').text(greeting);
    }
}

$(document).ready(function() {
    let app = new App();
});
