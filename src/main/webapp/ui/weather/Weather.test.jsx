import React from 'react';
import renderer from 'react-test-renderer';
import { Weather } from './Weather';

describe("Weather component", () => {

  test("should render the weather component", () => {
    let weather = {
      averageTempFahrenheit: 60,
      date: '2017-07-10'
    };
    let component = renderer.create(
      <Weather weather={weather} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

});
