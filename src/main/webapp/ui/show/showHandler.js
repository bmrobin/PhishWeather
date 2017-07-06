import { PhishApiService } from '../../services/phishAPIService';
import { LocationService } from '../../services/locationService';

const phishApiService = new PhishApiService();
const locationService = new LocationService();

export function findPhishShow(date) {
  return new Promise((resolve, reject) => {
    phishApiService.lookupShowByDate(date.year, date.month, date.day)
      .then((show) => {
        // let location = show.location.split(", ");
        console.log(show);
        resolve(show);
      })
      .catch((error) => {
        window.console.log(error);
        reject(error);
      });
  });
}

export function findWeatherForShow(show) {
  return new Promise((resolve) => {
    locationService.getWeather(year + month + day, location[0], location[1])
        .then((result) => {
          console.log(result);
          resolve(result);
        });
  });
}
