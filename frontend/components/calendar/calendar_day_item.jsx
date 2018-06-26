import React from 'react';
import { connect } from 'react-redux';

const CalendarDayItem = (props) => {
  let eventsArray;
  let extraEvents;
  if (props.eventsArray.length > 4) {
    eventsArray = props.eventsArray.slice(0, 3);
    eventsArray.push("extra");
  } else {
    eventsArray = props.eventsArray;
  }

  const eventDescriptions = eventsArray.map((eventId, i) => {
    if (eventId === "extra") {
      return (
        <div className="day-event-extra" key={i}>
          {props.eventsArray.length - 3} more events...
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
    <div onClick={() => props.toggleIndex(props.day)} className="day">
      <div className="day-number">{props.day}</div>
      {eventDescriptions}
    </div>
  );
};

const msp = (state, ownProps) => {
  const eventsArray = ownProps.getEventsArray(ownProps.day);
  return ({
    events: state.entities.events,
    eventsArray
  });
};

export default connect(msp, null)(CalendarDayItem);
