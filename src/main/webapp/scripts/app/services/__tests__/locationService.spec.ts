import { LocationService } from "../locationService";

jest.mock("jquery");
jest.mock("../ajaxRequest");

describe("Location Service", () => {

  let locationService: LocationService = new LocationService();

  test("should get weather for a given location", () => {
    return locationService.getWeather("2017-06-23", "Raleigh", "NC").then((result) => {
      expect(result).toBe("success");
    });
  });

  test("should report a failure to retrieve weather", () => {
    return locationService.getWeather("", "", "").catch((result) => {
      expect(result).toBe("error");
    });
  });
});
