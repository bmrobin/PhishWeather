import showResponse from './showResponse.json';
export function lookupShowByDate() {
  return new Promise((resolve) => {
    resolve(showResponse);
  });
}
