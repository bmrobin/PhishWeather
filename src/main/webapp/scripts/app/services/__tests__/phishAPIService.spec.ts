import * as $ from "jquery";
import { PhishApiService } from "../phishAPIService";

jest.mock("jquery");
jest.mock("../ajaxRequest");

describe("Phish API Service", () => {

  let phishAPIService: PhishApiService = new PhishApiService();

  test("should retrieve show information for a date", () => {
    return phishAPIService.lookupShowByDate("1998", "08", "09").then((data) => {
      expect(data).toBe("success");
    });
  });

  test("should report a failure to retrieve show data", () => {
    return phishAPIService.lookupShowByDate("", "", "").catch((result) => {
      expect(result).toBe("error");
    });
  });

});
