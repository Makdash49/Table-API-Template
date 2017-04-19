import React from 'react';

export class Message extends React.Component {
  render () {
    var {location, temp} = this.props;
    return (
      <tr className="message">
        <td>{location}</td>
        <td>{temp}</td>
      </tr>
    )
  }
}
