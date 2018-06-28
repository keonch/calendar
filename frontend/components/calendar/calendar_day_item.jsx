import React from 'react';
import { connect } from 'react-redux';

const CalendarDayItem = (props) => {
  const eventDescriptions = props.eventsArray.map((eventId, i) => {
    if (eventId === "grouped") {
      return (
        <div className="day-event-grouped" key={i}>
          {props.numberOfGroupedEvents} more events...
        </div>
      )
    } else {
      return (
        <div className="day-event" key={i}>
          {props.events[eventId].description}
        </div>
      );
    }
  });

  return (
    <div
      onClick={() => props.handleEventIndex(props.day)}
      className="day">
      <div className="day-number">{props.day}</div>
      {eventDescriptions}
    </div>
  );
};

const msp = (state, ownProps) => {
  // If dayItems are stacked, number of events rendered are reduced to 1
  // before being grouped. (normally renders 4 before being grouped)
  const renderNumber = ownProps.stacked ? 1 : 4
  let eventsArray;
  if (ownProps.eventsArray.length > renderNumber) {
    eventsArray = ownProps.eventsArray.slice(0, renderNumber - 1);
    eventsArray.push("grouped");
  } else {
    eventsArray = ownProps.eventsArray;
  }
  const numberOfGroupedEvents =
    ownProps.eventsArray.length - eventsArray.length + 1;

  return ({
    events: state.events,
    eventsArray,
    numberOfGroupedEvents
  });
};

export default connect(msp, null)(CalendarDayItem);
