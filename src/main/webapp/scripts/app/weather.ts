export class Weather {

    currentTempFahrenheit: string;
    feelsLikeFahrenheit: string;
    location: string;
    time: string;
    conditions: string;

    constructor(jsonData : any) {
        $.extend(this, jsonData);
    }
}
