import React from 'react';
import './Show.css';

export class Show extends React.Component {

  constructor(props) {
    super(props);
  }
  
  markup() {
    return {
      __html: this.props.show.setlistnotes
    };
  }
  render() {

    return (
      <div className="show">
        <div>Phish show on <span id="show-date-id">{this.props.show.showdate}</span></div>

        <table>
          <tbody>
            <tr>
              <td className="show-result-title"><span><strong>Venue</strong></span></td>
              <td><span id="show-venue-id">{this.props.show.venue}</span></td>
            </tr>

            <tr>
              <td className="show-result-title"><span><strong>Location</strong></span></td>
              <td><span id="show-location-id">{this.props.show.location}</span></td>
            </tr>

            <tr>
              <td className="show-result-title"><span><strong>Show Notes</strong></span></td>
              <td><span id="show-notes-id" dangerouslySetInnerHTML={this.markup()}></span></td>
            </tr>

            <tr>
              <td className="show-result-title"><span><strong>phish.net Link</strong></span></td>
              <td><a href={this.props.show.link} target="blank">{this.props.show.showdate}</a></td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}
