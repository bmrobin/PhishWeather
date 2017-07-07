import React from 'react';
import './Error.css';

export function Error(props) {
  return (
    <span id='error-id' className="error">{props.error}</span>
  );
}
