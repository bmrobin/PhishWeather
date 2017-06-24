import { Location } from "../location";

describe("Models: Location", () => {

  test("should create location object", () => {
    let location: Location = new Location("Raleigh", "NC");
    expect(location.city).toBe("Raleigh");
    expect(location.state).toBe("NC");
  });

});
