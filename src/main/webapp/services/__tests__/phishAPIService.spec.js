import * as $ from "jquery";
import { lookupShowByDate } from "../phishAPIService";

jest.mock("../ajaxRequest");

describe("Phish API Service", () => {

  test("should retrieve show information for a date", () => {
    return lookupShowByDate("1998", "08", "09").then((data) => {
      expect(data).toBe("success");
    });
  });

  test("should report a failure to retrieve show data", () => {
    return lookupShowByDate("", "", "").catch((result) => {
      expect(result).toBe("error");
    });
  });

});
