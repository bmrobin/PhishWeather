import * as $ from "jquery";
import { appUrl, phishApiKey } from "../common/constants";
import { Show } from "../models/show";

const ajaxGet = (requestData: Object, endpoint: string) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      data: requestData,
      method: "GET",
      success: (data) => {
        resolve(data);
      },
      url: appUrl + endpoint
    }).then(
      (data) => {
        resolve(data);
      },
      () => {
        window.console.error("An error occurred connecting to " + appUrl + endpoint);
        reject(null);
      });
  });
};

const ajaxPost = (url: string, queryString: string) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      crossDomain: true,
      data: {},
      // required to prevent Access-Control-Allow-Origin error
      dataType: "jsonp",
      method: "POST",
      url: url + phishApiKey + queryString
    }).then(
      (data, textStatus, jqXHR) => {
        if (data.response.count === 1) {
          resolve(new Show(data.response.data[0]));
        } else {
          // either 0 or multiple shows were found
          resolve(null);
        }
      },
      (jqXHR, textStatus, error) => {
        window.console.error("An error occurred retrieving data from api.phish.net!");
        reject(null);
      });
  });
};

export { ajaxGet, ajaxPost };
