import React from 'react';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date()
    }
  }

  componentDidMount() {
    this.props.fetchEvents(this.state.today);
  }

  render() {
    return (
      <div className="calendar">

      </div>
    )
  }
}
