import React from 'react';
import Date from './date';
import { Show } from './show/show';
import { findPhishShow } from '../services/serviceHandler';

export class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      date: {
        day: undefined,
        month: undefined,
        year: undefined
      },
      show: undefined,
      weather: undefined
    };
    
    this.dateChangeEvent = this.dateChangeEvent.bind(this);
    this.findShow = this.findShow.bind(this);
  }

  dateChangeEvent(dateProperty, value) {
    let newDate = this.state.date;
    switch (dateProperty) {
      case 'day':
        newDate.day = value;
        break;
      case 'month':
        newDate.month = value;
        break;
      case 'year':
        newDate.year = value;
        break;
      default:
        break;
    }
    this.setState({ date: newDate });
  }

  findShow() {
    let showResult;
    findPhishShow(this.state.date).then((data) => {
      showResult = data;
      this.setState({
        show: showResult
      })
    });
  }

  render() {
    return (
      <div>
        <Date day={this.state.date.day}
              month={this.state.date.month}
              year={this.state.date.year}
              dateChange={this.dateChangeEvent} />
        <button id="get-date-id" type="button" onClick={this.findShow}>Lookup Date</button>
        {
          this.state.show &&
          <Show show={this.state.show} /> 
        }
      </div>
    );
  }
}
