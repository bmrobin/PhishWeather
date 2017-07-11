import weatherResponse from './weatherResponse1.json';
export function getWeather() {
  return new Promise((resolve) => {
    resolve(weatherResponse);
  });
}
