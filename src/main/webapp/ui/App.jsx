import React from 'react';
import Date from './date';
import { Show } from './show/show';
import { Weather } from './weather/weather';
import { Error } from './error/error';
import { getWeather } from '../services/weatherService';
import { lookupShowByDate } from '../services/phishAPIService';

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
    let showResult, weatherResult;
    lookupShowByDate(this.state.date).then((data) => {
      showResult = data;
      this.setState({
        show: showResult,
        error: undefined
      });
      getWeather(this.state.date, this.state.show.location)
        .then((data) => {
          weatherResult = data;
          this.setState({
            weather: weatherResult
          });
        })
        .catch((error) => {
          let errorMessage;
          if (error.status === 0) {
            errorMessage = "An error occurred connecting with the backend service!";
          } else if (error.status === 404) {
            errorMessage = 'Weather for the Phish show was not found!';
          }
          this.setState({
            error: errorMessage
          });
        });
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
        {
          this.state.weather &&
          <Weather weather={this.state.weather} />
        }
        {
          this.state.error &&
          <Error error={this.state.error} />
        }
      </div>
    );
  }
}
