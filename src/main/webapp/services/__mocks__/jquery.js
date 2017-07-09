const ajax = (requestData) => {
  return new Promise((resolve, reject) => {
    if (requestData.method === 'GET') {
      if (requestData.data) {
        resolve(requestData);
      } else if (requestData.data === null) {
        reject({ responseText: '{"error": "an error occurred", "status": 500}' });
      } else {
        reject({ responseText: '{error: "errorz", status: 500}' });
      }
    } else if (requestData.method === 'POST') {
      if (requestData.url.endsWith('?param1=this')) {
        resolve({response: { count: 1, data: ['success'] }});
      } else if (requestData.url.endsWith('more')) {
        resolve({response: { count: 2, data: ['success', 'success'] }});
      } else {
        reject(null);
      }
    }
  });
}

export { ajax };
