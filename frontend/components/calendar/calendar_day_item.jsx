import React from 'react';

export default class CalendarDayItem extends React.Component {
  constructor(props) {
    super(props);

    this.renderEventDescriptions = this.renderEventDescriptions.bind(this);
  }

  renderEventDescriptions() {
    let eventsArray;
    let extraEvents;
    const eventsAllowed = this.props.stacked ? 1 : 4
    if (this.props.eventsArray.length > eventsAllowed) {
      eventsArray = this.props.eventsArray.slice(0, eventsAllowed - 1);
      eventsArray.push("extra");
    } else {
      eventsArray = this.props.eventsArray;
    }

    // for days that are stacked on top of each other, number of events
    // shown are reduced to 1 (rather than 4) before being grouped
    const eventDescriptions = eventsArray.map((eventId, i) => {
      if (eventId === "extra") {
        return (
          <div className="day-event-extra" key={i}>
            {this.props.eventsArray.length - eventsArray.length + 1} more events...
          </div>
        )
      } else {
        return (
          <div className="day-event" key={i}>
            {this.props.events[eventId].description}
          </div>
        );
      }
    });

    return eventDescriptions;
  }

  render() {
    return (
      <div onClick={() => this.props.toggleIndex(this.props.day)} className="day">
        <div className="day-number">{this.props.day}</div>
        {this.renderEventDescriptions()}
      </div>
    );
  }
}
