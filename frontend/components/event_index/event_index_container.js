import { connect } from 'react-redux';
import EventIndex from './event_index';

const msp = (state, ownProps) => {
  const day = ownProps.date.getDate();
  const eventsArray = ownProps.getEventsArray(day);
  return ({
    events: state.events,
    eventsArray
  });
};

export default connect(msp, null)(EventIndex);
