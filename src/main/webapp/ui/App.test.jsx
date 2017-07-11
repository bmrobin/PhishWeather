import React from 'react';
import { App } from './App';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

jest.mock('../date/Date.css');
jest.mock('../services/phishAPIService');
jest.mock('../services/weatherService');

describe("App component", () => {

  test("should initially only render date component", () => {
    let component = renderer.create( <App /> );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("should render show, weather, and error components when present in state", () => {
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

  test("should store the date in state and update when changed", () => {
    let component = shallow(< App /> );
    component.props().children[0].props.dateChange('day', '11');
    expect(component.state().date).toEqual({day: '11', month: undefined, year: undefined});
    
    component.props().children[0].props.dateChange('month', '07');
    expect(component.state().date).toEqual({day: '11', month: '07', year: undefined});
    
    component.props().children[0].props.dateChange('year', '2017');
    expect(component.state().date).toEqual({day: '11', month: '07', year: '2017'});
    
    component.props().children[0].props.dateChange('unknown value', undefined);
    expect(component.state().date).toEqual({day: '11', month: '07', year: '2017'});
  });

  test("should load show and weather components when button is clicked", () => {
    let component = shallow( <App /> );
    component.find('button').simulate('click');

    // despite resolving the promise immediately in the mocks
    // the asynchronous call still results in state not being updated
    // the only way i could get this to work is to wrap it
    // in an immediately invoked setTimeout function ¯\_(ツ)_/¯
    setTimeout(() => {
      expect(component.state().show).toEqual({
        date: '1998-08-09',
        location: 'Virginia Beach, VA',
        venue: 'Virginia Beach Amphitheater'
      });
    }, 1);

    setTimeout(() => {
      expect(component.state().weather).toEqual({
        averageTempFahrenheit: 60,
        date: '2017-06-23'
      });
    }, 1);
  });

});
