import weatherMock1 from './weatherResponse1.json';
import weatherMock2 from './weatherResponse2.json';

const ajaxGet = (requestData) => {
  return new Promise((resolve, reject) => {
    if (requestData.hasOwnProperty("city") && requestData["city"] === "Raleigh") {
      resolve(weatherMock1);
    } else if (requestData.hasOwnProperty("city") &&
               requestData["city"] === "Eas%20ley" &&
               requestData["state"] === "S%20C") {
      resolve(weatherMock2);
    } else {
      reject({error: 404});
    }
  });
};

const ajaxPost = (url, query) => {
  return new Promise((resolve, reject) => {
    if (query !== "&day=&month=&year=") {
      resolve("success");
    } else {
      reject("error");
    }
  });
};

export { ajaxGet, ajaxPost };
