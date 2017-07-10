import { getWeather } from "../weatherService";

jest.mock("../ajaxRequest");

describe("Location Service", () => {

  test("should get weather for a given location", () => {
    return getWeather({ year: '2017', month: '06', day: '23' }, "Raleigh, NC")
      .then((result) => {
        expect(result).toEqual({averageTempFahrenheit: '60', date: '2017-06-23'});
      });
  });

  test("should replace spaces in city/state with URL chars", () => {
    return getWeather({ year: '', month: '', day: ''}, "Eas ley, S C")
      .then((result) => {
        expect(result).toEqual({averageTempFahrenheit: '70', date: '2017-07-08'});
      });
  });

  test("should report a failure to retrieve weather", () => {
    return getWeather({}, "City, State")
      .catch((result) => {
        expect(result).toEqual({error: 404});
      });
  });
});
