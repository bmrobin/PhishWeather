import React from 'react';
import renderer from 'react-test-renderer';
import { Show } from './Show';

describe("Show component", () => {

  test("should render the show component", () => {
    let show = {
      showdate: '1998-08-09',
      venue: 'Virginia Beach Amphitheater',
      location: 'Virginia Beach, VA',
      setlistnotes: 'show notes here',
      link: 'http://phish.net'
    };
    let component = renderer.create(
      <Show show={show} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

});
