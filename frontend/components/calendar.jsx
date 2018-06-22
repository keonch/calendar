import React from 'react';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchEvents("june2018");
  }

  render() {
    return (
      <div className="calendar">

      </div>
    )
  }
}
