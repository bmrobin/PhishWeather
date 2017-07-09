import * as $ from "jquery";
import { appUrl, phishApiKey } from "../common/constants";

// Simple wrapper functions around GET and POST requests

/**
 * jQuery AJAX GET wrapper
 * @param {obj} requestData - data to send in the request
 * @param {string} endpoint - URL endpoint to send to
 */
const ajaxGet = (requestData, endpoint) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      data: requestData,
      method: "GET",
      url: appUrl + endpoint
    }).then(
      (data) => {
        resolve(data);
      })
      .catch((error) => {
        try {
          reject(JSON.parse(error.responseText));
        } catch (e) {
          reject(error);
        }
      });
  });
};

/**
 * jQuery AJAX POST wrapper
 * @param {string} url - URL endpoint to send to
 * @param {string} queryString - (optional) query string to append to URL
 */
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
      })
      .catch(() => {
        window.console.error("An error occurred retrieving data from api.phish.net!");
        reject(null);
      });
  });
};

export { ajaxGet, ajaxPost };
