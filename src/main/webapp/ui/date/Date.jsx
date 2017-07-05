import React from 'react';
import { Day } from './Day';
import { Month } from './Month';
import { Year } from './Year';
import './Date.css';

export class Date extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="date">
        <Day day="null" handleChange="" />
        <Month month="null" handleChange="" />
        <Year year="null" handleChange="" />
        <button id="get-date-id" type="button">Lookup Date</button>
      </div>
    );
  }
}
