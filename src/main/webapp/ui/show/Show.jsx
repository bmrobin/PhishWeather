import React from 'react';

export function Show(props) {
  return (
    <div>
      <div className="row">Phish show on <span id="show-date-id">{props.show.showdate}</span></div>

      <div className="row">
        <span><strong>Venue</strong></span>
        <span id="show-venue-id">{props.show.venue}</span>
      </div>

      <div className="row">
        <span><strong>Location</strong></span>
        <span id="show-location-id">{props.show.location}</span>
      </div>

      <div className="row">
        <span><strong>Show Notes</strong></span>
        <span id="show-notes-id">{props.show.setlistnotes}</span>
      </div>

      <div className="row">
        <span><strong>phish.net Link</strong></span>
        <a href={props.show.link} target="blank">{props.show.showdate}</a>
      </div>
    </div>
  );
}
