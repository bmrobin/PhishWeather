import * as $ from "jquery";
import { appUrl, phishApiKey } from "../common/constants";

const ajaxGet = (requestData, endpoint) => {
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

const ajaxPost = (url, queryString) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      crossDomain: true,
      data: {},
      // required to prevent Access-Control-Allow-Origin error
      dataType: "jsonp",
      method: "POST",
      url: url + phishApiKey + queryString
    }).then(
      (data) => {
        if (data.response.count === 1) {
          resolve(data.response.data[0]);
        } else {
          // either 0 or multiple shows were found
          resolve(null);
        }
      },
      () => {
        window.console.error("An error occurred retrieving data from api.phish.net!");
        reject(null);
      });
  });
};

export { ajaxGet, ajaxPost };
