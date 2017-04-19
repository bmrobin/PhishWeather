export class Weather {

    public averageTempFahrenheit: string;
    public date: string;

    constructor(jsonData: any) {
        $.extend(this, jsonData);
    }
}
