const ajaxGet = (requestData: Object, endpoint: string) => {
  return new Promise((resolve, reject) => {
    if (requestData.hasOwnProperty("city") && requestData["city"] !== "") {
      resolve("success");
    } else {
      reject("error");
    }
  });
};

const ajaxPost = (url: string, query: string) => {
  return new Promise((resolve, reject) => {
    if (query !== "&day=&month=&year=") {
      resolve("success");
    } else {
      reject("error");
    }
  });
};

export { ajaxGet, ajaxPost };
