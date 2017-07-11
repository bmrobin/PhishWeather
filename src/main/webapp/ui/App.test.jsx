import React from 'react';
import { App } from './App';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

jest.mock('../date/Date.css');

describe("App component", () => {

  test("should initially only render date component", () => {
    let component = renderer.create( <App /> );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("should render show, weather, and error components in the app when present", () => {
    let show = {
      showdate: '2017-07-10',
      venue: 'Raleigh, NC'
    };
    let component = mount( <App /> );
    component.setState({show: show});
    expect(component.find('.show').exists()).toBe(true);

    let weather = {
      averageTempFahrenheit: 82,
      date: '2017-07-10'
    };
    component.setState({weather: weather});
    expect(component.find('#temperature-id').exists()).toBe(true);

    let error = 'error message';
    component.setState({error: error});
    expect(component.find('#error-id').exists()).toBe(true);
  });

});
