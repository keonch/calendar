import { connect } from 'react-redux';
import CalendarDayItem from './calendar_day_item';

const msp = (state, ownProps) => {
  const eventsArray = ownProps.getEventsArray(ownProps.day);
  return ({
    events: state.entities.events,
    eventsArray
  });
};

export default connect(msp, null)(CalendarDayItem);
