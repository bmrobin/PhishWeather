import { Location } from './location';
import { Weather } from './weather';

export class LocationService {

    getLocationData(location: string) {
        let loc = new Location(location);
        $.ajax({
            url: 'http://localhost:8080/' + loc.zipCode,
            method: 'GET'
        }).then(
            function(data, textStatus, jqXHR) {
                window.console.log('here\'s your data: ' + data);
            },
            function(jqXHR, textStatus, error) {
                window.console.log(error);
            }
        )
    }
}
