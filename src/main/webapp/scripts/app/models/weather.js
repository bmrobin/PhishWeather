import * as $ from "jquery";

export class Weather {

    public averageTempFahrenheit;
    public date;

    constructor(jsonData) {
        $.extend(this, jsonData);
    }
}
