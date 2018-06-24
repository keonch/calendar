import React from 'react';

export default class EventIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.day
    }
  }

  static getDerivedStateFromProps(props, state) {
    return ({
      day: props.day
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.day}</h1>
      </div>
    );
  }
}
