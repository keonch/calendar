import { connect } from 'react-redux';
import { fetchAllEvents } from '../actions/event_actions';
import { groupAndSortEvents } from '../reducers/selectors';
import Calendar from './calendar';

const msp = (state) => {
  // groupAndSortEvents selector is used to key events by their month and year
  // it is done on the client-side to compute date and time objects
  // based on user's timezone (rails stores all datetime objects in UTC)
  return ({
    events: state.entities.events,
    sortedEvents: groupAndSortEvents(state.entities.events)
  });
}

const mdp = (dispatch) => {
  return ({
    fetchAllEvents: (date) => dispatch(fetchAllEvents(date))
  });
}

export default connect(msp, mdp)(Calendar);
