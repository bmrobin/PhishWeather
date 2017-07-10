import { ajaxGet, ajaxPost } from '../ajaxRequest';

jest.mock('jquery');

describe("AJAX requests", () => {
  
  describe("GET", () => {
    
    test("should mock an AJAX GET request", () => {
      return ajaxGet({request: 'request'}, '/urlEndpoint')
        .then((result) => {
          expect(result.data).toEqual({request: 'request'});
          expect(result.method).toBe('GET');
          expect(result.url).toBe('http://localhost:8080/urlEndpoint');
        });
    });

    test("should parse an error response from the GET request", () => {
      return ajaxGet(null).catch((error) => {
        expect(error.error).toBe('an error occurred');
        expect(error.status).toBe(500);
      });
    });

    test("should return raw error response from the GET request if it cannot be parsed", () => {
      return ajaxGet(undefined).catch((error) => {
        expect(error).toEqual({responseText: '{error: "errorz", status: 500}'});
      });
    });
  });

  describe("POST", () => {

    test("should mock an AJAX POST request", () => {
      return ajaxPost('http://url.com', '?param1=this')
        .then((result) => {
          expect(result).toBe('success');
        });
    });

    test("should error when request returns more than 1 result", () => {
      return ajaxPost('http://url.com', 'more')
        .then((result) => {
          expect(result).toBe(null);
        });
    });

    test("should handle error if the request fails", () => {
      return ajaxPost('http://url.com', '')
        .catch((error) => {
          expect(error).toBe("An error occurred retrieving data from api.phish.net!");
        });
    });

  });

});
