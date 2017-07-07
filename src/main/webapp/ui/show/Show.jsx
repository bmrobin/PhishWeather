import React from 'react';
import './Show.css';

export function Show(props) {
  return (
    <div className="show">
      <div className="">Phish show on <span id="show-date-id">{props.show.showdate}</span></div>

      <table>
        <tr>
          <td className="show-result-title"><span><strong>Venue</strong></span></td>
          <td><span id="show-venue-id">{props.show.venue}</span></td>
        </tr>

        <tr>
          <td className="show-result-title"><span><strong>Location</strong></span></td>
          <td><span id="show-location-id">{props.show.location}</span></td>
        </tr>

        <tr>
          <td className="show-result-title"><span><strong>Show Notes</strong></span></td>
          <td><span id="show-notes-id">{props.show.setlistnotes}</span></td>
        </tr>
        
        <tr>
          <td className="show-result-title"><span><strong>phish.net Link</strong></span></td>
          <td><a href={props.show.link} target="blank">{props.show.showdate}</a></td>
        </tr>
      </table>

    </div>
  );
}
