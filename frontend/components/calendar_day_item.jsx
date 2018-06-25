import React from 'react';
import { connect } from 'react-redux';

const CalendarDayItem = (props) => {
  const eventDescriptions = props.eventsArray.map((eventId) => {
    return (
      <div key={eventId}>{props.events[eventId].description}</div>
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

const msp = (state) => {
  return ({
    events: state.entities.events
  });
};

const mdp = (dispatch) => {
  return ({

  });
};

export default connect(msp, mdp)(CalendarDayItem);
