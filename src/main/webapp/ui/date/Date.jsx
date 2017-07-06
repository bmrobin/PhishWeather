import React from 'react';
import { Day } from './Day';
import { Month } from './Month';
import { Year } from './Year';
import './Date.css';

export class Date extends React.Component {

  constructor(props) {
    super(props);

    this.dayChangeEvent = this.dayChangeEvent.bind(this);
    this.monthChangeEvent = this.monthChangeEvent.bind(this);
    this.yearChangeEvent = this.yearChangeEvent.bind(this);
  }

  dayChangeEvent(event) {
    this.props.dateChange('day', event.target.value);
  }

  monthChangeEvent(event) {
    this.props.dateChange('month', event.target.value);
  }

  yearChangeEvent(event) {
    this.props.dateChange('year', event.target.value);
  }

  render() {
    return (
      <div className="date">
        <Month month={this.props.month} handleChange={this.monthChangeEvent} />
        <Day day={this.props.day} handleChange={this.dayChangeEvent} />
        <Year year={this.props.year} handleChange={this.yearChangeEvent} />
      </div>
    );
  }
}
