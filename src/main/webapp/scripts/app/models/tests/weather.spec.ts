import { Weather } from "../weather";

describe("Models: Weather", () => {

  test("should create weather object from json", () => {
    let jsonData = {averageTempFahrenheit: "75", date: "2017-06-21"};
    let weather: Weather = new Weather(jsonData);
    expect(weather).not.toBe(null);
    expect(weather.averageTempFahrenheit).toBe("75");
    expect(weather.date).toBe("2017-06-21");
  });

});
