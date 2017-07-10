import React from 'react';
import renderer from 'react-test-renderer';
import { Error } from './Error';

describe("Error component", () => {

  test("should render the error component", () => {
    let error = "an error occurred!";
    let component = renderer.create( <Error error={error} /> );
    expect(component.toJSON()).toMatchSnapshot();
  });

});
