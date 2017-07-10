import React from 'react';
import { App } from './App';
import renderer from 'react-test-renderer';

jest.mock('../date/Date.css');

describe("App component", () => {

  test("rendered app should match snapshot", () => {
    let component = renderer.create( <App /> );
    expect(component.toJSON()).toMatchSnapshot();
  });

});
