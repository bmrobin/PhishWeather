import { phishApiKey } from "../common/constants";
import { Show } from "../models/show";

export class PhishApiService {

    public lookupShowByDate(year: string, month: string, day: string): Promise<any> {

        let query = "&day=" + day + "&month=" + month + "&year=" + year;

        return new Promise((resolve, reject) => {
            $.ajax({
                crossDomain: true,
                data: {},
                // required to prevent Access-Control-Allow-Origin error
                dataType: "jsonp",
                method: "POST",
                url: "https://api.phish.net/v3/shows/query?apikey=" + phishApiKey + query
            }).then(
                (data, textStatus, jqXHR) => {
                    let show: Show = this.parseShowFromResponse(data);
                    resolve(show);
                },
                (jqXHR, textStatus, error) => {
                    window.console.error("An error occurred retrieving data from api.phish.net!");
                    reject(null);
                });
        });
    }

    public parseShowFromResponse(apiResponse: any): Show {
        if (apiResponse.response.count === 1) {
            return new Show(apiResponse.response.data[0]);
        } else {
            // either 0 or multiple shows were found
            return null;
        }
    }

}
