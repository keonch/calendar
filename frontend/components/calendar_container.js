import { connect } from 'react-redux';
import { fetchEvents } from '../actions/event_actions';
import { groupAndSortDays } from '../reducers/selectors';
import Calendar from './calendar';

const msp = (state) => {
  return ({
    events: state.entities.events,
    sortedEvents: groupAndSortDays(state.entities.events)
  });
}

const mdp = (dispatch) => {
  return ({
    fetchEvents: (date) => dispatch(fetchEvents(date))
  });
}

export default connect(msp, mdp)(Calendar);
