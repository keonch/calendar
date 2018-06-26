import React from 'react';
import { connect } from 'react-redux';

const CalendarDayItem = (props) => {
  const eventDescriptions = props.eventsArray.map((eventId) => {
    return (
      <div
        className="day-event"
        key={eventId}>
        {props.events[eventId].description}
      </div>
    );
  });
  return (
    <div
      onClick={() => props.toggleIndex(props.day)}
      className="day">
      {props.day}
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

const mdp = (dispatch) => {
  return ({

  });
};

export default connect(msp, mdp)(CalendarDayItem);
