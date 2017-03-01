export class Weather {

    public currentTempFahrenheit: string;
    public feelsLikeFahrenheit: string;
    public location: string;
    public time: string;
    public conditions: string;

    constructor(jsonData: any) {
        $.extend(this, jsonData);
    }
}
